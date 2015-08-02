/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import AbstractActions = require('./AbstractActions');

class TabActions extends AbstractActions {
	selectTab(id: number): void {
		this.dispatch(id);
	}
}

export = alt.createActions<TabActions>(TabActions);
