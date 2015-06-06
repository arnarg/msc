var mpd = require('mpd');
var cmd = mpd.cmd;
var CA  = require('coverart');
var $   = require('jquery');

var state;

var ca = new CA();

$(document).ready(function() {
	var client = mpd.connect({
		port: 6600,
		host: 'localhost'
	});

	client.on('ready', function() {
		client.sendCommand(cmd("status", []), function(err, msg) {
			state = /state: (\w+)\n/i.exec(msg)[1];

			if (state !== 'stop') {
				client.sendCommand(cmd("currentsong", []), function(err, msg) {
					if (msg) {
						var mbid = /MUSICBRAINZ_ALBUMID: (.*)\n/i.exec(msg)[1];
						updateCoverArt(mbid);
					}
				});
			}
		});
	});

	client.on('system-player', function(name) {
		client.sendCommand(cmd("currentsong", []), function(err, msg) {
			if (msg) {
				var mbid = /MUSICBRAINZ_ALBUMID: (.*)\n/i.exec(msg)[1];
				updateCoverArt(mbid);
			}
		});
	});
});

var togglePlay = function() {

};

var updateCoverArt = function(mbid) {
	fetchCoverArt(mbid)
	.done(function(img) {
		$('.cover').css('background-image',
		"url('" + img +"')");
	}).fail(function(res) {
		console.log('fail');
	});
};

var fetchCoverArt = function(mbid) {
	var defer = $.Deferred();
	ca.release(mbid, function(err, res) {
		if (res) {
			for (var i = 0; i < res.images.length; ++i) {
				if (res.images[i].front) {
					defer.resolve(res.images[i].image);
					return;
				}
			}
		}
		defer.reject();
	});
	return defer.promise();
};
