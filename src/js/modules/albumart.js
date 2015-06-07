var covers = require('album-cover')('a8515cff0a4856bbb5c5eae24fdc411b');

module.exports = {
	fetchCoverArt: function(artist, album, fn) {
		covers.search({
			artist: artist,
			album:  album,
			size:   'extralarge'
		}, fn);
	}
};
