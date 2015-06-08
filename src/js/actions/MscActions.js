var AppDispatcher = require('../dispatcher/AppDispatcher');
var MpdConstants  = require('../constants/MpdConstants');

var MscActions = {

	togglePlayback: function() {
		AppDispatcher.dispatch({
			actionType: MpdConstants.TOGGLE_PLAYBACK
		});
	},

	prevSong: function() {
		AppDispatcher.dispatch({
			actionType: MpdConstants.PREV
		});
	},

	nextSong: function() {
		AppDispatcher.dispatch({
			actionType: MpdConstants.NEXT
		});
	}

};
