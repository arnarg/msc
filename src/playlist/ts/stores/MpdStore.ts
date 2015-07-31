/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import MpdActions = require('../actions/MpdActions');
import AbstractStoreModel = require('./AbstractStoreModel');

class MpdStore extends AbstractStoreModel<IMpdStoreState> implements AltJS.StoreModel<IMpdStoreState> {
	playlist: any[] = [];
	constructor() {
		super();

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
}

export = alt.createStore<IMpdStoreState>(MpdStore, 'MpdStore');
