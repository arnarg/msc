/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';

class AbstractActions implements AltJS.ActionsClass {
    constructor( alt:AltJS.Alt) {}
    actions:any;
    dispatch: ( ...payload:Array<any>) => void;
    generateActions:( ...actions:Array<string>) => void;
}

class PlaylistActions extends AbstractActions {
	playSong(data: songData): void {
		this.dispatch(data);
	}
	removeSong(data: songData): void {
		this.dispatch(data);
	}
    updatePlaylist(playlist: listItem[]): void {
        this.dispatch(playlist);
    }
}

export = alt.createActions(PlaylistActions);
