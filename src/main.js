var app           = require('app');
var BrowserWindow = require('browser-window');
var Settings      = require('./Settings');
var Mpd           = require('./Mpd');

function openPlaylistWindow() {
	playlistWindow = new BrowserWindow({
		width: 650,
		height: 500,
		'auto-hide-menu-bar': true
	});
	playlistWindow.loadUrl('file://' + __dirname + '/playlist/index.html');
	playlistWindow.openDevTools();

	return playlistWindow;
}

function main() {
	var mpd;
	var playerWindow   = null;
	var playlistWindow = null;

	// This method will be called when Electron has done everything
	// initialization and ready for creating browser windows.
	app.on('ready', function() {
		var height = 290;
		// Adding the height of the window bar
		if (process.platform === "darwin") height += 22;

		// Create the browser window.
		playerWindow = new BrowserWindow({
			width: 250,
			height: height,
			resizable: false,
			fullscreen: false,
			'auto-hide-menu-bar': true
		});

		// and load the index.html of the app.
		playerWindow.loadUrl('file://' + __dirname + '/player/index.html');

		// Open the devtools.
		//mainWindow.openDevTools();

		// Emitted when the window is closed.
		playerWindow.on('closed', function() {
			app.quit();
		});

		playlistWindow = openPlaylistWindow();
		playlistWindow.on('closed', function() {
			playlistWindow = null;
		});

		ipc.on('connect', function() {
			mpd = new Mpd(new Settings(), playerWindow, playlistWindow);
		});
	});
}

main();
