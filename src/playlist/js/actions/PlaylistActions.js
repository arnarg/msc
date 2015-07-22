var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');

var PlaylistActions = {

	playSong: function(data) {
		AppDispatcher.dispatch({
			actionType: Constants.MPD_PLAY_SONG,
			data: data
		});
	},

	removeSong: function(data) {
		AppDispatcher.dispatch({
			actionType: Constants.MPD_REMOVE_SONG,
			data: data
		});
	}

};

module.exports = PlaylistActions;
