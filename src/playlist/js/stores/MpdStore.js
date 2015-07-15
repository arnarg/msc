var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var ipc           = require('ipc');

var CHANGE_EVENT = 'change';

var playlist = [];

ipc.on('playlist-update', function(data) {
	playlist = data;
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

		}
	})

});

module.exports = MpdStore;
