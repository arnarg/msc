var mpd = require('mpd');
var cmd = mpd.cmd;

var client;

function parseMsg(msg) {
	var lines = msg.split('\n');
	var ret = {};

	lines.forEach(function(line) {
		var capture = /([A-Za-z_]+): (.+)/i.exec(line);
		if (capture) ret[capture[1]] = capture[2];
	});

	return ret;
};

module.exports = {
	connect: function(host, port, fn) {
		client = mpd.connect({
			host: host,
			port: port
		});

		client.on('ready', fn);
		client.on('system-player', fn);
	},
	getStatus: function(fn) {
		client.sendCommand(cmd('status', []), function(err, res) {
			if (err) throw err;

			var msgObj = parseMsg(res);
			fn(msgObj);
		});
	},
	getSong: function(fn) {
		client.sendCommand(cmd('currentsong', []), function(err, res) {
			if (err) throw err;

			var msgObj = parseMsg(res);
			fn(msgObj);
		});
	},
	togglePlay: function(state, fn) {
		client.sendCommand(cmd('pause ' + (state === 'pause' ? '0' : '1'), []), fn);
	},
	prevSong: function() {
		client.sendCommand(cmd('previous', []));
	},
	nextSong: function() {
		client.sendCommanf(cmd('next', []));
	}
}
