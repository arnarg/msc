/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import AbstractActions = require('./AbstractActions');



class MpdActions extends AbstractActions {
	playSong(data: ISongData): void {
		this.dispatch(data);
	}
	removeSong(data: ISongData): void {
		this.dispatch(data);
	}
	updatePlaylist(playlist: IListItem[]): void {
		this.dispatch(playlist);
	}
	getAlbums(artist: string): void {
		this.dispatch(artist);
	}
	getSongs(artist: string, album: string) {
		this.dispatch({artist: artist, album: album});
	}
	addArtist(artist: string) {
		this.dispatch(artist);
	}
	addAlbum(artist: string, album: string) {
		this.dispatch({artist: artist, album: album});
	}
	addSong(artist: string, album: string, song: string) {
		this.dispatch({artist: artist, album: album, song: song});
	}
}

export = alt.createActions<MpdActions>(MpdActions);
