var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/MpdConstants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var mpd           = require('mpd');
var cmd           = mpd.cmd;

var CHANGE_EVENT = 'change';

var client = {}; // Reference to mpd connection
var status = {};

function connect(host, port) {
	client = mpd.connect({
		host: host,
		port: port
	});

	client.on('ready', onUpdate);
	client.on('system-player', onUpdate);
}

function parseMsg(msg) {
	var lines = msg.split('\n');
	var ret = {};

	lines.forEach(function(line) {
		var capture = /([A-Za-z_]+): (.+)/i.exec(line);
		if (capture) ret[capture[1]] = capture[2];
	});

	return ret;
};

function onUpdate() {
	client.sendCommands(['status', 'currentsong'], function(err, res) {
		var resObj = parseMsg(res);

		if (resObj.Title !== status.Title) {
			// Parse cover
		}

		status = {
			Volume: resObj.volume,
			State:  resObj.state,
			Artist: resObj.Artist,
			Album:  resObj.Album,
			Title:  resObj.Title
		}

		// Update
	});
}

function togglePlayback() {
	client.sendCommand(cmd('pause ' + (status.State === 'pause' ? '0' : '1'), []));
}

function prevSong() {
	client.sendCommand(cmd('previous', []));
}

function nextSong() {
	client.sendCommand(cmd('next', []));
}

var MpdStore = assign({}, EventEmitter.prototype, {

	getStatus: function() {
		return status;
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
		var action = payload.action;

		switch(action.actionType) {
			case Constants.CONNECT:
				connect('localhost', 6600);
				break;
			case Constants.TOGGLE_PLAYBACK:
				togglePlayback();
				break;
			case Constants.PREV:
				prevSong();
				break;
			case Constants.NEXT:
				nextSong();
				break;
		}

		MpdStore.emitChange();
	})
});

module.exports = MpdStore;
