/// <reference path="typings/main.d.ts" />

import app = require('app');
import BrowserWindow = require('browser-window');
import ipc = require('ipc');
import Mpd = require('./Mpd');
import Settings = require('./Settings');

var devTools: boolean = true;

function openPlaylistWindow(): GitHubElectron.BrowserWindow {
	var plWindow: GitHubElectron.BrowserWindow = new BrowserWindow({
		width: 650,
		height: 500,
		'auto-hide-menu-bar': true
	});
	plWindow.loadUrl('file://' + __dirname + '/../playlist/index.html');
	if (devTools) plWindow.openDevTools();

	return plWindow;
}

function main(args: string[]) {
	var mpd: Mpd;
	var settings: Settings = new Settings();
	var playerWindow: GitHubElectron.BrowserWindow = null;
	var playlistWindow: GitHubElectron.BrowserWindow = null;

	app.on('ready', () => {
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
		playerWindow.loadUrl('file://' + __dirname + '/../player/index.html');
		if (devTools) playerWindow.openDevTools();

		// Emitted when the window is closed.
		playerWindow.on('closed', function() {
			app.quit();
		});

		playlistWindow = openPlaylistWindow();
		playlistWindow.on('closed', function() {
			playlistWindow = null;
		});

		mpd = new Mpd(settings.getSettings(), () => {
				playerWindow.webContents.send('connection-success');
				if (playlistWindow)
					playlistWindow.webContents.send('connection-success');
			}, () => {
				playerWindow.webContents.send('connection-fail');
				if (playlistWindow)
					playlistWindow.webContents.send('connection-fail');
			});

		mpd.onUpdate(() => {
			playerWindow.webContents.send('update');
			if (playlistWindow)
				playlistWindow.webContents.send('update');
		});

		ipc.on('mpd-command', (e, arg) => {
			mpd.sendCommand(arg.command, (err, res) => {
				var status: string = (err ? err : 'OK');
				e.sender.send('cmd ' + arg.id, status);
			});
		});

		ipc.on('get-playlist', (e, arg) => {
			mpd.getPlaylist().then((playlist: IPlaylistItem[]) => {
				e.sender.send('playlist', playlist);
			});
		});

		ipc.on('get-artists', (e, arg) => {
			mpd.getArtists().then((artists: string[]) => {
				e.sender.send('artists', artists);
			}).catch((err) => {
				console.log(err);
			});
		});

		ipc.on('get-albums', (e, arg) => {
			mpd.getAlbums(arg.artist).then((albums: IAlbums) => {
				e.sender.send('albums', albums);
			}).catch((err) => {
				console.log(err);
			});
		});
	});
}

main(process.argv);
