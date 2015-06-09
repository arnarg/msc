var AppDispatcher     = require('../dispatcher/AppDispatcher');
var MpdConstants      = require('../constants/MpdConstants');
var CoverConstants    = require('../constants/CoverConstants');
var SettingsConstants = require('../constants/SettingsConstants');

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
	},

	saveSettings: function(settings) {
		AppDispatcher.dispatch({
			actionType: SettingsConstants.UPDATE_SETTINGS,
			data: settings
		});
	}

};

module.exports = MscActions;
