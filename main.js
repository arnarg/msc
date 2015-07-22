var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var mpd = require('mpd');
var cmd = mpd.cmd;
var mpdparser = require('./mpdparser');

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

var settings = require('./settings')(ipc);

// Mpd
var client;
var timeout;
var playing;
var canConnect = true;

function connect(event) {
	if (canConnect) {
		canConnect = false;
		client = mpd.connect({
			host: settings.host || 'localhost',
			port: settings.port || 6600
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
		var status = mpdparser.parseStatus(res);

		playing = status.state === 'play';

		mainWindow.webContents.send('status-update', status);

		if (playing && (!timeout || timeout._called)) {
			timeout = setTimeout(updateStatus, 500);
		}
	});
}

function updatePlaylist() {
	client.sendCommand(cmd('playlistinfo', []), function(err, res) {
		var playlist = mpdparser.parsePlaylist(res);

		playlistWindow.webContents.send('playlist-update', {playlist: playlist});
	});
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

ipc.on('play-song', function(event, arg) {
	client.sendCommand(cmd('playid ' + arg, []));
});
