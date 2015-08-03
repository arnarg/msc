/// <reference path="../typings/player.d.ts" />

import * as alt from '../alt';
import AbstractStoreModel = require('./AbstractStoreModel');
import MpdActions = require('../actions/MpdActions');
import CoverActions = require('../actions/CoverActions');

class MpdStore extends AbstractStoreModel<IMpdStoreModel> implements AltJS.StoreModel<IMpdStoreModel> {
	status: IStatusObj = {
		volume: 0,
		state: 'stop',
		artist: '',
		album: '',
		title: '',
		elapsed: 1,
		duration: 1,
		repeat: 0,
		random: 0,
		time: 0
	};
	_timeout = null;
	constructor() {
		super();
		this.bindListeners({
			onGetStatus: MpdActions['GET_STATUS'],
			refreshStatus: [
				MpdActions['TOGGLE_PLAYBACK'],
				MpdActions['PREV_SONG'],
				MpdActions['NEXT_SONG'],
				MpdActions['SEEK_POS'],
				MpdActions['RANDOM'],
				MpdActions['REPEAT']
			]
		});
	}

	onGetStatus(status: IStatusObj) {
		var updateCover: boolean = this.status.album !== status.album;
		this.status = status;
		if (updateCover) CoverActions.getCover(status.artist, status.album);
		// set a timeout if state is playing and there isn't a pending timeout
		if (status.state === 'play' && this._timeout === null) {
			this._timeout = setTimeout(() => {
				console.log('timeout');
				this._timeout = null;
				MpdActions.getStatus();
			}, 500);
		}
	}

	refreshStatus() {
		// Clear pending timeout if there is one
		if (this._timeout !== null) {
			clearTimeout(this._timeout);
			this._timeout = null;
		}

		MpdActions.getStatus();
	}
}

export = alt.createStore<IMpdStoreModel>(MpdStore);
