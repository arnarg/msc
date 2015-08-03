/// <reference path="../typings/player.d.ts"/>

import * as ipc from 'ipc';

var MpdUtils = {
	id: 0,
	fetchStatus() {
		return new Promise((resolve, reject) => {
			ipc.once('status', (status: IStatusObj) => {
				resolve(status);
			});
			ipc.send('get-status');
			// Reject after timeout
			setTimeout(() => reject(), 2000);
		});
	},
	sendCommand(cmd: string) {
		return new Promise((resolve, reject) => {
			var command = {
				id: this.id++,
				command: cmd
			};
			ipc.once('cmd ' + command.id, (status: string) => {
				if (status === 'OK') resolve();
				else reject(status);
			});
			ipc.send('mpd-command', command);
		});
	},
	togglePlayback(currentState: string) {
		return this.sendCommand('pause ' + (currentState === 'play' ? '1' : '0'));
	},
	prevSong() {
		return this.sendCommand('previous');
	},
	nextSong() {
		return this.sendCommand('next');
	},
	seekPos(pos: number) {
		return this.sendCommand('seekcur ' + pos);
	},
	random(curr: number) {
		return this.sendCommand('random ' + (curr ? '0' : '1'));
	},
	repeat(curr: number) {
		return this.sendCommand('repeat ' + (curr ? '0' : '1'));
	}
};

export = MpdUtils;
