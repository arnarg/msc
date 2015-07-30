/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import PlaylistActions = require('../actions/PlaylistActions');

class MpdStore extends AbstractStoreModel<MpdStoreState> implements AltJS.StoreModel<MpdStoreState> {
	playlist: any[] = [];
	constructor() {
		super();

		ipc.on('playlist-update', (data: MpdStoreState) => {
			this.playlist = data.playlist;
		});

		this.bindListeners(PlaylistActions);
	}

	onPlaySong(data: songData): void {
		ipc.send('play-song', data.id);
	}

	onRemoveSong(data: songData): void {
		ipc.send('remove-song', data.id);
	}
}

export = alt.createStore(MpdStore, 'MpdStore');
