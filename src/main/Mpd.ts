/// <reference path="Typings/main.d.ts" />

import mpd      = require('mpd');
import ipc      = require('ipc');
import Settings = require('./Settings');

class Mpd {

	private client: mpd.MpdClient;
	private connected: boolean = false;
	private playing: boolean = false;
	private timeout: any;

	constructor(
		private settings: Settings,
		private playerWindow: GitHubElectron.BrowserWindow,
		private playlistWindow?: GitHubElectron.BrowserWindow
	) {
		this.connect();
		this.initIPC();
	}

	setPlaylistWindow(playlistWindow: GitHubElectron.BrowserWindow) {
		this.playlistWindow = playlistWindow;
	}

	private connect(): void {
		this.client = mpd.connect(this.settings.getSettings());

		this.client.on('ready', () => {
			// Let the windows know that the connection was successful
			this.playerWindow.webContents.send('connection-success');
			this.playlistWindow.webContents.send('connection-success');
			this.connected = true;
			// initially fetch status and playlist
			this.updateStatus();
			this.updatePlaylist();
			// system-player event occurs everytime there is a change
			// in mpd (new song, play/pause)
			this.client.on('system-player', () => {
				this.updateStatus();
				this.updatePlaylist();
			})
		});

		this.client.on('end', () => {
			// Let the windows know that the connection has ended
			this.playerWindow.webContents.send('connection-fail');
			this.playlistWindow.webContents.send('connection-fail');
			this.connected = false;
			// Try to reconnect
			this.connect();
		});
	}

	private updateStatus(): void {
		this.client.sendCommands(['status', 'currentsong'], (err, res) => {
			if (!err) {
				var status = Parser.parseStatus(res);

				this.playing = status.state === 'play';

				this.playerWindow.webContents.send('status-update', status);
				// Call this function again in 500ms to update
				// song progress bar
				if (this.playing && (!this.timeout || this.timeout._called)) {
					this.timeout = setTimeout(this.updateStatus, 500);
				}
			}
		});
	}

	private updatePlaylist(): void {
		this.client.sendCommand(mpd.cmd('playlistinfo', []), (err, res) => {
			if (!err) {
				var playlist = Parser.parsePlaylist(res);

				this.playlistWindow.webContents.send('playlist-update', playlist);
			}
		});
	}

	private initIPC():void {
		ipc.on('toggle-playback', () => {
			this.client.sendCommand(
				mpd.cmd('pause ' + (this.playing ? '1' : '0'), [])
			);
		});
		ipc.on('prev-song', () => {
			this.client.sendCommand(mpd.cmd('previous', []));
		});
		ipc.on('next-song', () => {
			this.client.sendCommand(mpd.cmd('next', []));
		});
		ipc.on('seek', (e, arg) => {
			this.client.sendCommand(mpd.cmd('seekcur ' + arg, []));
		});
		ipc.on('random', (e, arg) => {
			this.client.sendCommand(mpd.cmd('random ' + arg, []));
		});
		ipc.on('repeat', (e, arg) => {
			this.client.sendCommand(mpd.cmd('repeat ' + arg, []));
		});
		ipc.on('play-song', (e, arg) => {
			this.client.sendCommand(mpd.cmd('playid ' + arg, []));
		});
		ipc.on('remove-song', (e, arg) => {
			this.client.sendCommand(mpd.cmd('deleteid ' + arg, []), (err, res) => {
				if (!err) this.updatePlaylist();
			});
		});
	}

}

module Parser {

	function buildRegex(props: string[]): RegExp {
		return new RegExp('(' + props.join('|') +'): (.*)', 'i');
	}

	function parseProps(str: string, props: string[]): any {
		var regex: RegExp   = this.buildRegex(props);
		var lines: string[] = str.split('\n');
		var ret: any        = {};

		lines.forEach(function(line) {
			var capture = regex.exec(line);
			// Check if a match was found
			if (capture && capture[1]) {
				ret[capture[1].toLowerCase()] = capture[2];
			}
		});

		return ret;
	}

	export function parseStatus(str: string): any {
		// An array of the properties I want to
		// extract from the response from mpd
		var props: string[] = [
			'volume',
			'state',
			'artist',
			'album',
			'title',
			'elapsed',
			'duration',
			'repeat',
			'random',
			'time'
		];
		var obj: any = this.parseProps(str, props);
		// Some of the props need to be integers
		obj.elapsed = parseInt(obj.elapsed);
		obj.time    = parseInt(obj.time);
		obj.repeat  = parseInt(obj.repeat);
		obj.random  = parseInt(obj.random);
		obj.volume  = parseInt(obj.volume);

		return obj;
	}

	export function parsePlaylist(str: string): any {
		// Each song begins with a file property
		// so splitting the string at a new line
		// followed by file: seperates the songs
		var songs: string[] = str.split(/\n(?=file:)/);
		var playlist: any[] = [];

		songs.forEach((song) => {
			var props: string[] = [
				'file',
				'artist',
				'album',
				'genre',
				'title',
				'time',
				'id'
			];
			var obj: any = this.parseProps(song, props);

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

}

export = Mpd;
