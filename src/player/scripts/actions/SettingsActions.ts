/// <reference path="../typings/player.d.ts" />

import * as alt from '../alt';
import AbstractActions = require('./AbstractActions');
import SettingsUtils = require('../utils/SettingsUtils');

class SettingsActions extends AbstractActions {
	saveSettings(settings: ISettingsObj) {
		SettingsUtils.saveSettings(settings).then(() => {
			this.dispatch(settings);
		}).catch((err) => {
			console.log(err);
		});
	}

	getSettings() {
		SettingsUtils.getSettings().then((settings: ISettingsObj) => {
			this.dispatch(settings);
		}).catch((err) => {
			console.log(err);
		});
	}
}

export = alt.createActions<SettingsActions>(SettingsActions);
