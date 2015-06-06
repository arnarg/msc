var mpd = require('mpd');
var cmd = mpd.cmd;
var CA  = require('coverart');
var $   = require('jquery');

var state;
var client = mpd.connect({
	port: 6600,
	host: 'localhost'
});

var ca = new CA();

$(document).ready(function() {
	$('.settings').hide();
	client.on('ready', function() {
		client.sendCommand(cmd("status", []), function(err, msg) {
			state = /state: (\w+)\n/i.exec(msg)[1];

			if (state !== 'stop') updateCoverArt();

			if (state === 'play') {
				$('#playBtn').addClass('fa-pause');
			} else {
				$('#playBtn').addClass('fa-play');
			}
		});
	});

	client.on('system-player', function(name) {
		updateCoverArt();
	});

	$('.cover').mouseenter(function() {
		$('.song-info').addClass('shown');
	}).mouseleave(function() {
		$('.song-info').removeClass('shown');
	})
});

var togglePlay = function() {
	client.sendCommand(cmd('pause ' + (state === 'pause' ? '0' : '1'), []),
		function(err, msg) {
			client.sendCommand(cmd('status', []), function(err, msg) {
				state = /state: (\w+)\n/i.exec(msg)[1];

				$('#playBtn')
				.removeClass('fa-play fa-pause')
				.addClass((state === 'play' ? 'fa-pause' : 'fa-play'));
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

var updateCoverArt = function() {
	client.sendCommand(cmd('currentsong', []), function(err, msg) {
		if (msg) {
			var mbid = /MUSICBRAINZ_ALBUMID: (.*)\n/i.exec(msg)[1];
			fetchCoverArt(mbid)
			.done(function(img) {
				$('.cover').css('background-image', "url('" + img +"')");
			}).fail(function(res) {
				$('.cover').css('background-image', 'none');
			});
		}
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
