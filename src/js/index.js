var mpd    = require('mpd');
var cmd    = mpd.cmd;
var CA     = require('coverart');
var jQuery = require('jquery');
var $      = jQuery;
var sightglass = require('sightglass');
var rivets = require('rivets');

var func = require('./functions.js');

var mpdStatus = {
	volume: 0,
	state: ""
};
var songInfo = {
	Artist: "",
	Title: ""
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

	$('#mousearea').mouseenter(function() {
		$('.song-info').addClass('shown');
	}).mouseleave(function() {
		$('.song-info').removeClass('shown');
	});

	console.log(rivets.bind($('#song-info'), {model: songInfo}));
});

rivets.formatters.upper = function(value) {
	return value.toUpperCase();
};

var updateStatus = function() {
	client.sendCommand(cmd('status', []), function(err, msg) {
		var msgObj = func.parseMsg(msg);

		mpdStatus.volume = msgObj.volume;
		mpdStatus.state  = msgObj.state;

		if (mpdStatus.state === 'play') {
			$('#playBtn').addClass('fa-pause');
		} else {
			$('#playBtn').addClass('fa-play');
		}

		if (mpdStatus.state !== 'stop') {
			client.sendCommand(cmd('currentsong', []), function(err, msg) {
				var msgObj = func.parseMsg(msg);

				songInfo.Artist = msgObj.Artist;
				songInfo.Title  = msgObj.Title;

				updateCoverArt(msgObj.MUSICBRAINZ_ALBUMID);
			});
		}
	});
}

var togglePlay = function() {
	client.sendCommand(cmd('pause ' + (mpdStatus.state === 'pause' ? '0' : '1'), []),
		function(err, msg) {
			client.sendCommand(cmd('status', []), function(err, msg) {
				var msgObj = func.parseMsg(msg);

				mpdStatus.volume = msgObj.volume;
				mpdStatus.state  = msgObj.state;

				$('#playBtn')
				.removeClass('fa-play fa-pause')
				.addClass((mpdStatus.state === 'play' ? 'fa-pause' : 'fa-play'));
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
