/// <reference path="../typings/player.d.ts" />

import * as alt from '../alt';
import AbstractStoreModel = require('./AbstractStoreModel');
import SettingsActions = require('../actions/SettingsActions');

class SettingsStore extends AbstractStoreModel<ISettingsObj> implements AltJS.StoreModel<ISettingsObj> {
	settings: ISettingsObj;
	constructor() {
		super();
		this.bindListeners({
			onSettings: [
				SettingsActions['SAVE_SETTINGS'],
				SettingsActions['GET_SETTINGS']
			]
		});
		SettingsActions.getSettings();
	}

	onSettings(settings: ISettingsObj) {
		this.settings = settings;
	}
}

export = alt.createStore<ISettingsObj>(SettingsStore);
