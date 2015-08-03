/// <reference path="../typings/player.d.ts"/>

import * as alt from '../alt';
import AbstractStoreModel = require('./AbstractStoreModel');
import CoverActions = require('../actions/CoverActions');

class CoverStore extends AbstractStoreModel<ICoverStoreModel> implements AltJS.StoreModel<ICoverStoreModel> {
	cover: string = 'img/background.png';
	constructor() {
		super();
		this.bindActions(CoverActions);
	}

	onGetCover(cover: string) {
		this.cover = cover;
	}
}

export = alt.createStore<ICoverStoreModel>(CoverStore);
