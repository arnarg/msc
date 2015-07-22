var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var ipc           = require('ipc');

var CHANGE_EVENT = 'change';

var playlist = [];

ipc.on('playlist-update', function(data) {
	// Deep copy
	playlist = JSON.parse(JSON.stringify(data)).playlist;
	MpdStore.emitChange();
});

var MpdStore = assign({}, EventEmitter.prototype, {

	getPlaylist: function() {
		return playlist;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		switch(payload.actionType) {
			case Constants.MPD_PLAY_SONG:
				ipc.send('play-song', payload.data.id);
				break;
			case Constants.MPD_REMOVE_SONG:
				ipc.send('remove-song', payload.data.id);
				break;
		}
	})

});

module.exports = MpdStore;
