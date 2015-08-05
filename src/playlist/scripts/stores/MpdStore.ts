/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import MpdActions = require('../actions/MpdActions');
import AbstractStoreModel = require('./AbstractStoreModel');

class MpdStore extends AbstractStoreModel<IMpdStoreState> implements AltJS.StoreModel<IMpdStoreState> {
	playlist: IPlaylistItem[] = [];
	artists: string[] = [];
	albums: IAlbums = {
		artist: '',
		albums: []
	};
	songs: ISongs = {
		artist: '',
		album: '',
		songs: []
	};
	constructor() {
		super();
		this.bindListeners({
			onUpdatePlaylist: MpdActions['UPDATE_PLAYLIST'],
			onGetArtists: MpdActions['GET_ARTISTS'],
			onGetAlbums: MpdActions['GET_ALBUMS'],
			onGetSongs: MpdActions['GET_SONGS'],
			onRemoveSong: MpdActions['REMOVE_SONG'],
			onAddArtist: MpdActions['ADD_ARTIST'],
			onAddAlbum: MpdActions['ADD_ALBUM'],
			onAddSong: MpdActions['ADD_SONG']
		});
	}

	onUpdatePlaylist(playlist: IPlaylistItem[]) {
		this.playlist = playlist;
	}

	onGetArtists(artists: string[]) {
		this.artists = artists;
	}

	onGetAlbums(albums: IAlbums) {
		this.albums = albums;
	}

	onGetSongs(songs: ISongs) {
		this.songs = songs;
	}

	onRemoveSong() {
		MpdActions.updatePlaylist();
	}

	onAddArtist() {
		MpdActions.updatePlaylist();
	}

	onAddAlbum() {
		MpdActions.updatePlaylist();
	}

	onAddSong() {
		MpdActions.updatePlaylist();
	}
}

export = alt.createStore<IMpdStoreState>(MpdStore, 'MpdStore');
