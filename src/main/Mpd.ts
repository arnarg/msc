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

	getPlaylist(): Promise<ISong[]> {
		return new Promise<ISong[]>((resolve, reject) => {
			this.client.sendCommand(mpd.cmd('playlistinfo', []), (err, res) => {
				if (err)
					reject(err);
				else
					resolve(Parser.parseSongs(res));
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
							songs: Parser.parseSongs(res)
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

	export function secsToMins(time: string): string {
		// Converting time from seconds to minutes:seconds
		var seconds = parseInt(time);
		var h = Math.floor(seconds / 60);
		var s = seconds % 60;
		// Adding 0 padding because 03:05 looks nicer than 3:5
	 	return (h < 10 ? '0' : '') + h + ':' + (s < 10 ? '0' : '') + s;
	}

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

	export function parseStats(str: string): IStats {
		var props: string[] = [
			'volume',
			'state',
			'time',
			'repeat',
			'random'
		];
		var tmp = this.parseProps(str, props);
		var stats: IStats = {
			volume: parseInt(tmp.volume),
			repeat: parseInt(tmp.repeat),
			random: parseInt(tmp.random),
			state: tmp.state,
			elapsed: 1,
			duration: 1
		};
		if (tmp.time) {
			// time is formatted elapsed:duration in seconds
			var comp = /([0-9]+):([0-9]+)/.exec(tmp.time);
			stats.elapsed = parseInt(comp[1]);
			stats.duration = parseInt(comp[2]);
		}

		return stats;
	}

	// Parse a single song
	export function parseSong(str: string): ISong {
		var props: string[] = [
			'artist',
			'album',
			'title',
			'track',
			'time',
			'id'
		];
		var tmp = this.parseProps(str, props);
		var song: ISong = {
			artist: tmp.artist,
			album: tmp.album,
			title: tmp.title,
			track: parseInt(/([0-9]+)\/[0-9]+/.exec(tmp.track)[1]),
			time: this.secsToMins(tmp.time),
			id: parseInt(tmp.id)
		};

		return song;
	}

	// Parse multiple songs
	export function parseSongs(str: string): ISong[] {
		var songs: ISong[] = [];
		// if the list of songs is empty there is nothing to parse
		if (str === '') return songs;

		var tmp: string[] = str.split(/\n(?=file)/);

		tmp.forEach((song) => {
			songs.push(this.parseSong(song));
		});

		return songs;
	}

	export function parseStatus(str: string): IStatusObj {
		// First there is information about the status
		// followed by the current song.
		// Current song begins with 'file:' so we can
		// split on a new line character followed by 'file:'
		var split: string[] = str.split(/\n(?=file:)/);

		// if playback is stopped there is not current song
		if (!split[1]) {
			var song: ISong = {
				artist: '',
				album: '',
				title: '',
				track: 0,
				time: '',
				id: 0
			};
		} else {
			var song: ISong = this.parseSong(split[1]);
		}

		return {
			stats: this.parseStats(split[0]),
			currentSong: song
		};
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
