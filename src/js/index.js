var jQuery = require('jquery');
var $      = jQuery;
var rivets = require('rivets');
var mpd    = require('./modules/mpdcontrols.js');
var cover  = require('./modules/albumart.js');

var settings = {
	port: 6600,
	host: 'localhost'
};
var mpdStatus = {
	volume: 0,
	state: ''
};
var songInfo = {
	Artist: '',
	Title: ''
};

$(document).ready(function() {
	// Connect to mpd
	mpd.connect(settings.host, settings.port, updateStatus);

	// Listen to mouseover on cover image
	// to display song info
	$('#mousearea').mouseenter(function() {
		$('.song-info').addClass('shown');
	}).mouseleave(function() {
		$('.song-info').removeClass('shown');
	});

	// Data binding
	rivets.bind($('#song-info'), {model: songInfo});
	rivets.bind($('#settings'), {model: settings});
});

// Formatter to display artist name in upper case
rivets.formatters.upper = function(value) {
	return value.toUpperCase();
};

var updateStatus = function() {
	mpd.getStatus(function(res) {
		mpdStatus.volume = res.volume;
		mpdStatus.state  = res.state;

		$('#playBtn')
		.removeClass('fa-play fa-pause')
		.addClass((mpdStatus.state === 'play' ? 'fa-pause' : 'fa-play'));

		if (mpdStatus.state !== 'stop') {
			mpd.getSong(function(res) {
				if (res.Title !== songInfo.Title) {
					cover.fetchCoverArt(res.Artist, res.Album, updateCoverArt);
				}

				songInfo.Artist = res.Artist;
				songInfo.Title  = res.Title;
			});
		}
	});
}

var togglePlay = function() {
	mpd.togglePlay(mpdStatus.state, updateStatus);
};
var prevSong = mpd.prevSong;
var nextSong = mpd.nextSong;

var toggleSettings = function() {
	var elem = $('.settings');
	if (elem.hasClass('shown')) {
		elem.removeClass('shown');
	} else {
		elem.addClass('shown');
	}
};

var updateCoverArt = function(err, res) {
	if (err) console.log(err);

	var elem = $('.cover');
	if (res === 'No image was found') {
		elem.css('background-image', 'none');
	} else {
		elem.css('background-image', "url('" + res + "')");
	}
};
