/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import MpdUtils = require('../utils/MpdUtils');
import AbstractActions = require('./AbstractActions');

class MpdActions extends AbstractActions {
	playSong(data: ISongData): void {
		MpdUtils.playSong(data.id).catch((e) => {
			console.log(e);
		});
	}
	removeSong(data: ISongData): void {
		MpdUtils.removeSong(data.id).then(() => {
			this.dispatch();
		}).catch((e) => {
			console.log(e);
		});
	}
	updatePlaylist(): void {
		MpdUtils.fetchPlaylist().then((playlist) => {
			this.dispatch(playlist);
		}).catch((e) => {
			console.log(e);
		});
	}
	getArtists(): void {
		MpdUtils.fetchArtists().then((artists: string[]) => {
			this.dispatch(artists);
		}).catch((e) => {
			console.log(e);
		});
	}
	getAlbums(artist: string): void {
		MpdUtils.fetchAlbums(artist).then((albums: IAlbums) => {
			this.dispatch(albums);
		}).catch((e) => {
			console.log(e);
		});
	}
	getSongs(artist: string, album: string): void {
		MpdUtils.fetchSongs(artist, album).then((songs: ISongs) => {
			this.dispatch(songs);
		}).catch((e) => {
			console.log(e);
		});
	}
	addArtist(artist: string): void {
		MpdUtils.addArtist(artist).then(() => {
			this.dispatch();
		}).catch((e) => {
			console.log(e);
		});
	}
	addAlbum(artist: string, album: string): void {
		MpdUtils.addAlbum(artist, album).then(() => {
			this.dispatch();
		}).catch((e) => {
			console.log(e);
		});
	}
	addSong(artist: string, album: string, song: string): void {
		MpdUtils.addSong(artist, album, song).then(() => {
			this.dispatch();
		}).catch((e) => {
			console.log(e);
		});
	}
}

export = alt.createActions<MpdActions>(MpdActions);
