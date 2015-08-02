/// <reference path="typings/main.d.ts" />

import mpd = require('mpd');

class Mpd {
	private client: mpd.MpdClient;
	private connected: boolean = false;

	constructor(settings: ISettingsObj, succCB?: () => void, failCB?: () => void) {
		this.connect(settings);
	}

	connect(settings: ISettingsObj, succCB?: () => void, failCB?: () => void) {
		this.client = mpd.connect(settings);

		this.client.on('ready', () => {
			this.connected = true;
			if (succCB) succCB();
		});

		this.client.on('end', () => {
			this.connected = false;
			if (failCB) failCB();
		});
	}

	onUpdate(cb: () => void): void {
		this.client.on('system-player', () => cb());
	}

	getStatus(): Promise<IStatusObj> {
		return new Promise<IStatusObj>((resolve, reject) => {
			this.client.sendCommands(['status', 'currentsong'], (err, res) => {
				if (err)
					reject(err);
				else
					resolve(Parser.parseStatus(res));
			});
		});
	}

	getPlaylist(): Promise<IPlaylistItem[]> {
		return new Promise<IPlaylistItem[]>((resolve, reject) => {
			this.client.sendCommand(mpd.cmd('playlistinfo', []), (err, res) => {
				if (err)
					reject(err);
				else
					resolve(Parser.parsePlaylist(res));
			});
		});
	}

	getArtists(): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			this.client.sendCommand(mpd.cmd('list artist', []), (err, res) => {
				if (err)
					reject(err);
				else
					resolve(Parser.parseList(res, 'Artist'));
			});
		});
	}

	getAlbums(artist: string): Promise<IAlbums> {
		return new Promise<IAlbums>((resolve, reject) => {
			this.client.sendCommand(
				mpd.cmd('list album artist "' + artist + '"', []), (err, res) => {
					if (err)
						reject(err);
					else {
						var ret: IAlbums = {
							artist: artist,
							albums: Parser.parseList(res, 'Album')
						};
						resolve(ret);
					}
				});
		});
	}

	getSongs(artist: string, album: string): Promise<ISongs> {
		return new Promise<ISongs>((resolve, reject) => {
			this.client.sendCommand(
				mpd.cmd('find album "' + album + '" artist "' + artist +'"', []),
				(err, res) => {
					if (err)
						reject(err);
					else {
						var ret: ISongs = {
							artist: artist,
							album: album,
							songs: Parser.parseList(res, 'Title')
						};
						resolve(ret);
					}
				});
		});
	}

	sendCommand(cmd: string, cb?: (err, res) => void): void {
		this.client.sendCommand(mpd.cmd(cmd, []), cb);
	}

	isConnected(): boolean {
		return this.connected
	}
}

module Parser {

	export function buildRegex(props: string[]): RegExp {
		return new RegExp('(' + props.join('|') +'): (.*)', 'i');
	}

	export function parseProps(str: string, props: string[]): any {
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

	export function parseStatus(str: string): IStatusObj {
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
		var obj = this.parseProps(str, props);
		// Some of the props need to be integers
		obj.elapsed = parseInt(obj.elapsed);
		obj.time    = parseInt(obj.time);
		obj.repeat  = parseInt(obj.repeat);
		obj.random  = parseInt(obj.random);
		obj.volume  = parseInt(obj.volume);

		return obj;
	}

	export function parsePlaylist(str: string): IPlaylistItem[] {
		// Each song begins with a file property
		// so splitting the string at a new line
		// followed by file: seperates the songs
		var songs: string[] = str.split(/\n(?=file:)/);
		var playlist: IPlaylistItem[] = [];

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
			var obj = this.parseProps(song, props);

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

	export function parseList(str: string, prop: string): string[] {
		var regex: RegExp = buildRegex([prop]);
		var artists: string[] = str.split('\n');
		var ret: string[] = [];
		artists.forEach(function(artist) {
			var result = regex.exec(artist);
			if (result && result[2]) {
				ret.push(result[2]);
			}
		});
		return ret;
	}
}

export = Mpd;
