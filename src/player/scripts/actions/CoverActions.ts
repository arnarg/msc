/// <reference path="../typings/player.d.ts" />

import * as alt from '../alt';
import * as MusicCover from 'music-cover';
import AbstractActions = require('./AbstractActions');

var covers = MusicCover('a8515cff0a4856bbb5c5eae24fdc411b');

class CoverActions extends AbstractActions {
	getCover(artist: string, album: string) {
		if (artist === '' || album === undefined) {
			this.dispatch('img/background.png');
			return;
		} else {
			covers.search({
				artist: artist,
				album: album,
				size: 'xlarge'
			}, (err, res) => {
				if (err) console.log(err);
				else {
					var url = res === 'No image was found' ? 'img/background.png' : res;
					// Don't change the image until after it has been loaded
					var img = new Image();
					img.onload = () => {
						this.dispatch(url);
					};
					img.src = url;
				}
			});
		}
	}
}

export = alt.createActions<CoverActions>(CoverActions);
