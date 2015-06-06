var mpd = require('mpd');
var cmd = mpd.cmd;
var CA  = require('coverart');
var $   = require('jquery');

var func = require('./functions.js');

var globals = {
	status: {},
	currentsong: {}
};
var client = mpd.connect({
	port: 6600,
	host: 'localhost'
});

var ca = new CA();

$(document).ready(function() {
	client.on('ready', function() {
		updateStatus();
	});

	client.on('system-player', function(name) {
		updateStatus();
	});

	$('.cover').mouseenter(function() {
		$('.song-info').addClass('shown');
	}).mouseleave(function() {
		$('.song-info').removeClass('shown');
	});
});

var updateStatus = function() {
	client.sendCommand(cmd('status', []), function(err, msg) {
		globals.status = func.parseMsg(msg);

		if (globals.status.state === 'play') {
			$('#playBtn').addClass('fa-pause');
		} else {
			$('#playBtn').addClass('fa-play');
		}

		if (globals.status.state !== 'stop') {
			client.sendCommand(cmd('currentsong', []), function(err, msg) {
				globals.currentsong = func.parseMsg(msg);

				updateCoverArt(globals.currentsong.MUSICBRAINZ_ALBUMID);
			});
		}
	});
}

var togglePlay = function() {
	client.sendCommand(cmd('pause ' + (globals.status.state === 'pause' ? '0' : '1'), []),
		function(err, msg) {
			client.sendCommand(cmd('status', []), function(err, msg) {
				globals.status = func.parseMsg(msg);

				$('#playBtn')
				.removeClass('fa-play fa-pause')
				.addClass((globals.status.state === 'play' ? 'fa-pause' : 'fa-play'));
			});
		}
	);
};

var prevSong = function() {
	client.sendCommand(cmd('previous', []), function(err, msg) {
		console.log(msg);
	});
};

var nextSong = function() {
	client.sendCommand(cmd('next', []), function(err, msg) {
		console.log(msg);
	});
};

var toggleSettings = function() {
	$('.settings').fadeToggle('slow');
};

var updateCoverArt = function(mbid) {
	fetchCoverArt(mbid)
	.done(function(img) {
		$('.cover').css('background-image', "url('" + img +"')");
	}).fail(function(res) {
		$('.cover').css('background-image', 'none');
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
