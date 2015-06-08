var covers        = require('album-cover')('a8515cff0a4856bbb5c5eae24fdc411b');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/CoverConstants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var MpdStore      = require('./MpdStore');

var CHANGE_EVENT = 'change';

var cover = 'none';

function fetchCoverArt(artist, album, fn) {
	console.log(artist + ' ' + album);
	covers.search({
		artist: artist,
		album:  album,
		size:   'extralarge'
	}, fn);
}

var CoverStore = assign({}, EventEmitter.prototype, {

	getCover: function() {
		return cover;
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
			case Constants.UPDATE:
				var mpdStatus = MpdStore.getStatus();
				fetchCoverArt(mpdStatus.Artist, mpdStatus.Album,
					function(err, res) {
						if (!err) {
							cover = (res !== 'No image was found' ? res : 'none');
							console.log(cover);
							CoverStore.emitChange();
						}
					}
				);
				break;
		}
	})
});

module.exports = CoverStore;
