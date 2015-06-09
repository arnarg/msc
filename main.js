var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var nconf = require('nconf');
var path = require('path');
var ipc = require('ipc');

// Report crashes to our server.
require('crash-reporter').start();

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

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 300,
		height: 350,
		resizable: false,
		fullscreen: false
	});

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	// Open the devtools.
	mainWindow.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});
