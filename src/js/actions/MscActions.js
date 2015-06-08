var AppDispatcher  = require('../dispatcher/AppDispatcher');
var MpdConstants   = require('../constants/MpdConstants');
var CoverConstants = require('../constants/CoverConstants');

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
	},

	updateCover: function() {
		AppDispatcher.dispatch({
			actionType: CoverConstants.UPDATE
		});
	}

};

module.exports = MscActions;
