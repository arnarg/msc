/// <reference path="../typings/player.d.ts"/>

import * as ipc from 'ipc';

var SettingsUtils = {
	saveSettings(settings: ISettingsObj) {
		return new Promise((resolve, reject) => {
			ipc.once('settings', (settings: ISettingsObj) => {
				resolve();
			});
			ipc.send('save-settings', settings);
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},

	getSettings() {
		return new Promise((resolve, reject) => {
			ipc.once('settings', (settings: ISettingsObj) => {
				resolve(settings);
			});
			ipc.send('get-settings');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	}
};

export = SettingsUtils;
