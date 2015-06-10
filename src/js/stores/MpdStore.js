var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var MscActions    = require('../actions/MscActions');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var mpd           = require('mpd');
var cmd           = mpd.cmd;
var SettingsStore = require('./SettingsStore');

var CHANGE_EVENT = 'change';

var client; // Reference to mpd connection
var status = {
	Volume:  100,
	State:   'stop',
	Artist:  '',
	Album:   '',
	Title:   '',
	Elapsed: '',
	Duration:''
};

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
}

function onUpdate() {
	client.sendCommands(['status', 'currentsong'], function(err, res) {
		var resObj = parseMsg(res);
		var oldAlbum = status.Album;
		
		var Time = /([0-9]+):([0-9]+)/i.exec(resObj.time);
		var Elapsed = Time[1];
		var Duration = Time[2];

		status = {
			Volume:   resObj.volume,
			State:    resObj.state,
			Artist:   resObj.Artist,
			Album:    resObj.Album,
			Title:    resObj.Title,
			Elapsed:  parseInt(Elapsed),
			Duration: parseInt(Duration)
		};

		MpdStore.emitChange();

		if (resObj.Album !== oldAlbum) {
			MscActions.updateCover();
		}

		if (status.State === 'play') setTimeout(onUpdate, 200);
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

	connect: function() {
		var settings = SettingsStore.getSettings();
		connect(settings.host, settings.port);
	},

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
		switch(payload.actionType) {
			case Constants.MPD_CONNECT:
				MpdStore.connect();
				break;
			case Constants.MPD_TOGGLE_PLAYBACK:
				togglePlayback();
				break;
			case Constants.MPD_PREV:
				prevSong();
				break;
			case Constants.MPD_NEXT:
				nextSong();
				break;
		}

		MpdStore.emitChange();
	})
});

module.exports = MpdStore;
