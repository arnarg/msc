/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';

class PlaylistActions extends AbstractActions {
	playSong(data: songData): void {
		this.dispatch(data);
	}
	removeSong(data: songData): void {
		this.dispatch(data);
	}
}

export = alt.createActions(PlaylistActions);
