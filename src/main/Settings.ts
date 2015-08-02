/// <reference path="typings/main.d.ts" />

import nconf = require('nconf');
import app   = require('app');
import path  = require('path');

class Settings {

	private nconf;

	constructor() {
		this.nconf = nconf;
		this.nconf.use('file', {
			file: path.join(app.getPath('userData'), 'config.json')
		});
		this.nconf.load();
	}

	getSettings(): ISettingsObj {
		return {
			host: this.nconf.get('host') || 'localhost',
			port: this.nconf.get('port') || 6600
		};
	}

	saveSettings(host: string, port: number, cb: (err: any) => void): void {
		this.nconf.set('host', host);
		this.nconf.set('port', port);
		nconf.save(cb);
	}

}

export = Settings;
