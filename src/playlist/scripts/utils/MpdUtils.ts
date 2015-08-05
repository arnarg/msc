/// <reference path="../typings/playlist.d.ts" />

import * as ipc from 'ipc';

var MpdUtils = {
	id: 0,
	fetchArtists() {
		return new Promise((resolve, reject) => {
			ipc.once('artists', (artists: string[]) => {
				resolve(artists);
			});
			ipc.send('get-artists');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchAlbums(artist: string) {
		return new Promise((resolve, reject) => {
			ipc.once('albums', (albums: IAlbums) => {
				resolve(albums);
			});
			ipc.send('get-albums', {artist: artist});
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchSongs(artist: string, album: string) {
		return new Promise((resolve, reject) => {
			ipc.once('songs', (songs: ISongs) => {
				resolve(songs);
			});
			ipc.send('get-songs', {artist: artist, album: album});
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchPlaylist() {
		return new Promise((resolve, reject) => {
			ipc.once('playlist', (playlist: IPlaylistItem[]) => {
				resolve(playlist);
			});
			ipc.send('get-playlist');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	sendCommand(cmd: string) {
		return new Promise((resolve, reject) => {
			var command = {
				id: this.id++,
				command: cmd
			};
			ipc.once('cmd ' + command.id, (status: string) => {
				if (status === 'OK') resolve();
				else reject(status);
			});
			ipc.send('mpd-command', command);
		});
	},
	playSong(id: number) {
		return this.sendCommand('playid ' + id);
	},
	removeSong(id: number) {
		return this.sendCommand('deleteid ' + id);
	},
	addArtist(artist: string) {
		return this.sendCommand('findadd artist "' + artist + '"');
	},
	addAlbum(artist: string, album: string) {
		return this.sendCommand('findadd album "' + album + '" artist "' + artist + '"');
	},
	addSong(artist: string, album: string, song: string) {
		return this.sendCommand('findadd title "' + song +
								'" album "' + album +
								'" artist "' +  artist + '"');
	}
}

export = MpdUtils;
