/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import MpdActions = require('../actions/MpdActions');
import AbstractStoreModel = require('./AbstractStoreModel');

class MpdStore extends AbstractStoreModel<IMpdStoreState> implements AltJS.StoreModel<IMpdStoreState> {
	playlist: IListItem[] = [];
	artists: string[];
	albums: string[];
	songs: string[];
	constructor() {
		super();
		// Get list of artist in the library
		setTimeout(() => ipc.send('get-artists'), 500);
		ipc.on('artists', (artists: string[]) => {
			this.artists = artists;
		});
		this.bindActions(MpdActions);
	}

	onPlaySong(data: ISongData): void {
		ipc.send('play-song', data.id);
	}

	onRemoveSong(data: ISongData): void {
		ipc.send('remove-song', data.id);
	}

	onUpdatePlaylist(playlist: IListItem[]) {
		this.playlist = playlist;
	}

	onGetAlbums(artist: string) {

	}

	onGetSongs(data: {artist: string, album: string}) {

	}

	onAddArtist(artist: string) {
		ipc.send('add-artist', {artist: artist});
	}
}

export = alt.createStore<IMpdStoreState>(MpdStore, 'MpdStore');
