var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var nconf = require('nconf');
var path = require('path');
var ipc = require('ipc');
var mpd = require('mpd');
var cmd = mpd.cmd;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var playlistWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
	var height = 290;
	// Adding the height of the window bar
	if (process.platform === "darwin") height += 22;

	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 250,
		height: height,
		resizable: false,
		fullscreen: false,
		'auto-hide-menu-bar': true
	});

	playlistWindow = new BrowserWindow({
		width: 650,
		height: 500,
		'auto-hide-menu-bar': true
	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/player/index.html');
	playlistWindow.loadUrl('file://' + __dirname + '/playlist/index.html');

	// Open the devtools.
	//mainWindow.openDevTools();
	playlistWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});


// Settings
nconf.use('file', {file: path.join(app.getPath('userData'), 'config.json')});
nconf.load();

ipc.on('save-settings', function(event, arg) {
	nconf.set('host', arg.host);
	nconf.set('port', (typeof arg.port === 'string' ? parseInt(arg.port) : arg.port));
	nconf.save(function(err) {
		var settings = {
			host: nconf.get('host'),
			port: nconf.get('port')
		};
		event.sender.send('save-settings', (err ? 'error' : settings));
	});
});

ipc.on('get-settings', function(event, arg) {
	event.returnValue = {
		host: nconf.get('host') || 'localhost',
		port: nconf.get('port') || 6600
	};
});


// Mpd
var client;
var timeout;
var playing;
var canConnect = true;

ipc.on('connect', connect);

function connect(event) {
	if (canConnect) {
		canConnect = false;
		client = mpd.connect({
			host: nconf.get('host') || 'localhost',
			port: nconf.get('port') || 6600
		});

		client.on('ready', function() {
			event.sender.send('connection-success');
			updateStatus();
			updatePlaylist();
			client.on('system-player', function() {
				updateStatus();
				updatePlaylist();
			});
		});
		client.on('end', function() {
			event.sender.send('connection-fail');
			canConnect = true;
		});
	}
}

function updateStatus() {
	client.sendCommands(['status', 'currentsong'], function(err, res) {
		var resObj = parseMsg(res);
		var Time;

		if (resObj.state !== 'stop')
			Time = /([0-9]+):([0-9]+)/i.exec(resObj.time);

		var Elapsed = (Time ? Time[1] : 1);
		var Duration = (Time ? Time[2] : 1);

		playing = resObj.state === 'play';

		var status = {
			Volume:   resObj.volume,
			State:    resObj.state,
			Artist:   resObj.Artist,
			Album:    resObj.Album,
			Title:    resObj.Title,
			Elapsed:  parseInt(Elapsed),
			Duration: parseInt(Duration),
			Repeat:   parseInt(resObj.repeat),
			Random:   parseInt(resObj.random)
		};

		mainWindow.webContents.send('status-update', status);

		if (status.State === 'play' && (!timeout || timeout._called)) {
			timeout = setTimeout(updateStatus, 500);
		}
	});
}

function updatePlaylist() {
	client.sendCommand(cmd('playlistinfo', []), function(err, res) {
		var playlist = parsePlaylist(res);

		playlistWindow.webContents.send('playlist-update', playlist);
	});
}

function parseMsg(msg) {
	var lines = msg.split('\n');
	var ret = {};

	lines.forEach(function(line) {
		var capture = /([A-Za-z_]+): (.+)/i.exec(line);
		if (capture && capture[1]) ret[capture[1]] = capture[2];
	});

	return ret;
}

function parsePlaylist(msg) {
	// This removes the Id line from each
	// song but I haven't found a way to
	// split after the regex
	// TODO: fix
	var songs = msg.split(/Id: \d+\n/);
	var playlist = [];

	songs.forEach(function(song) {
		var lines = song.split('\n');
		var obj = {};

		lines.forEach(function(line) {
			var capture = /^(file|artist|album|genre|title|time): (.*)$/i.exec(line);
			// Check if a match was found
			if (capture && capture[1]) {
				obj[capture[1].toLowerCase()] = capture[2];
			}
		});
		// The last index in the lines array will be
		// an empty string and we don't want that in
		// our playlist
		if (obj.hasOwnProperty('time')) {
			// Converting time from seconds to minutes:seconds
			var seconds = parseInt(obj.time);
			var h = Math.floor(seconds / 60);
			var s = seconds % 60;
			// Adding 0 padding because 03:05 looks nicer than 3:5
			obj.time = (h < 10 ? '0' : '') + h + ':' + (s < 10 ? '0' : '') + s;

			playlist.push(obj);
		}
	});

	return playlist;
}

ipc.on('connect', connect);

ipc.on('toggle-playback', function() {
	client.sendCommand(cmd('pause ' + (playing ? '1' : '0'), []));
});

ipc.on('prev-song', function() {
	client.sendCommand(cmd('previous', []));
});

ipc.on('next-song', function() {
	client.sendCommand(cmd('next', []));
});

ipc.on('seek', function(event, arg) {
	client.sendCommand(cmd('seekcur ' + arg, []));
});

ipc.on('random', function(event, arg) {
	client.sendCommand(cmd('random ' + arg, []));
});

ipc.on('repeat', function(event, arg) {
	client.sendCommand(cmd('repeat ' + arg, []));
});
