/// <reference path="../typings/player.d.ts" />

import * as alt from '../alt';
import AbstractActions = require('./AbstractActions');
import MpdUtils = require('../utils/MpdUtils');

class MpdActions extends AbstractActions {
	getStatus() {
		MpdUtils.fetchStatus().then((status: IStatusObj) => {
			this.dispatch(status);
		}).catch((err) => {
			console.log(err);
		});
	}
	togglePlayback(currentState: string): void {
		MpdUtils.togglePlayback(currentState).then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
	prevSong():void {
		MpdUtils.prevSong().then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
	nextSong(): void {
		MpdUtils.nextSong().then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
	seekPos(pos: number) {
		MpdUtils.seekPos(pos).then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
	random(curr: number) {
		MpdUtils.random(curr).then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
	repeat(curr: number) {
		MpdUtils.repeat(curr).then(() => {
			this.dispatch();
		}).catch((err) => {
			console.log(err);
		});
	}
}

export = alt.createActions<MpdActions>(MpdActions);
