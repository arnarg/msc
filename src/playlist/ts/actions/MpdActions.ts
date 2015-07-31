/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import AbstractActions = require('./AbstractActions');

class MpdActions extends AbstractActions {
	playSong(data: ISongData): void {
		this.dispatch(data);
	}
	removeSong(data: ISongData): void {
		this.dispatch(data);
	}
    updatePlaylist(playlist: IListItem[]): void {
        this.dispatch(playlist);
    }
}

export = alt.createActions<MpdActions>(MpdActions);
