/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import PlaylistActions = require('../actions/PlaylistActions');

class AbstractStoreModel<S> implements AltJS.StoreModel<S> {
	bindActions:( ...actions:Array<Object>) => void;
	bindAction:( ...args:Array<any>) => void;
	bindListeners:(obj:any)=> void;
	exportPublicMethods:(config:{[key:string]:(...args:Array<any>) => any}) => any;
	exportAsync:( source:any) => void;
	waitFor:any;
	exportConfig:any;
	getState:() => S;
}

class MpdStore extends AbstractStoreModel<MpdStoreState> implements AltJS.StoreModel<MpdStoreState> {
	playlist: any[] = [];
	constructor() {
		super();

		this.bindActions(PlaylistActions);
	}

	onPlaySong(data: songData): void {
		ipc.send('play-song', data.id);
	}

	onRemoveSong(data: songData): void {
		ipc.send('remove-song', data.id);
	}

	onUpdatePlaylist(playlist: listItem[]) {
		this.playlist = playlist;
	}
}

export = alt.createStore<MpdStoreState>(MpdStore, 'MpdStore');
