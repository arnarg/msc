/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import TabActions = require('../actions/TabActions');
import AbstractStoreModel = require('./AbstractStoreModel');

class TabStore extends AbstractStoreModel<ITabStoreState> implements AltJS.StoreModel<ITabStoreState> {
	activeTab: number = 0;
	tabs: ITab[] = [
		{
			id: 0,
			icon: 'fa fa-list',
			title: 'Playlist'
		},
		{
			id: 1,
			icon: 'fa fa-music',
			title: 'Library'
		}
	];
	constructor() {
		super();

		this.bindActions(TabActions);
	}

	onSelectTab(id: number) {
		// Make sure provided id is legal
		if (id >= 0 && id < this.tabs.length) {
			this.activeTab = id;
		}
	}
}

export = alt.createStore<ITabStoreState>(TabStore, 'TabStore');
