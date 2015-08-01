/// <reference path="../typings/playlist.d.ts" />

import * as ipc from 'ipc';

var MpdUtils = {
	fetchArtists() {
		return new Promise(function(resolve, reject) {
			ipc.on('artists', (artists: string[]) => {
				resolve(artists);
			});
			ipc.send('get-artists');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchAlbums(artist: string) {
		return new Promise(function(resolve, reject) {
			ipc.on('albums', (albums: IAlbums) => {
				resolve(albums);
			});
			ipc.send('get-albums', {artist: artist});
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchSongs(artist: string, album: string) {
		return new Promise(function(resolve, reject) {
			ipc.on('songs', (songs: ISongs) => {
				resolve(songs);
			});
			ipc.send('get-songs', {artist: artist, album: album});
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	fetchPlaylist() {
		return new Promise(function(resolve, reject) {
			ipc.on('playlist', (playlist: IListItem[]) => {
				resolve(playlist);
			});
			ipc.send('get-playlist');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	playSong(id: number) {
		ipc.send('play-song', id);
	},
	removeSong(id: number) {
		ipc.send('remove-song', id);
	},
	addArtist(artist: string) {
		ipc.send('add-artist', {artist: artist});
	},
	addAlbum(artist: string, album: string) {
		ipc.send('add-album', {artist: artist, album: album});
	},
	addSong(artist: string, album: string, song: string) {
		ipc.send('add-song', {artist: artist, album: album, song: song});
	}
}

export = MpdUtils;
