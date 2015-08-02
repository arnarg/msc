/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import MpdUtils = require('../utils/MpdUtils');
import AbstractActions = require('./AbstractActions');

class MpdActions extends AbstractActions {
	playSong(data: ISongData): void {
		MpdUtils.playSong(data.id);
	}
	removeSong(data: ISongData): void {
		MpdUtils.removeSong(data.id);
	}
	updatePlaylist(playlist: IListItem[]): void {
		this.dispatch(playlist);
	}
	getArtists(): void {
		MpdUtils.fetchArtists().then((artists: string[]) => {
			this.dispatch(artists);
		}).catch(() => {
			console.log('error');
		});
	}
	getAlbums(artist: string): void {
		MpdUtils.fetchAlbums(artist).then((albums: IAlbums) => {
			this.dispatch(albums);
		}).catch(() => {
			console.log('error');
		});
	}
	getSongs(artist: string, album: string): void {
		MpdUtils.fetchSongs(artist, album).then((songs: ISongs) => {
			this.dispatch(songs);
		}).catch(() => {
			console.log('error');
		});
	}
	addArtist(artist: string): void {
		MpdUtils.addArtist(artist);
	}
	addAlbum(artist: string, album: string): void {
		MpdUtils.addAlbum(artist, album);
	}
	addSong(artist: string, album: string, song: string): void {
		MpdUtils.addSong(artist, album, song);
	}
}

export = alt.createActions<MpdActions>(MpdActions);
