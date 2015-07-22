function buildRegex(props) {
	return new RegExp('(' + props.join('|') +'): (.*)', 'i');
}

var mpdparser = {

	parseProps: function(str, props) {
		var regex = buildRegex(props);
		var lines = str.split('\n');
		var ret   = {};

		lines.forEach(function(line) {
			var capture = regex.exec(line);
			// Check if a match was found
			if (capture && capture[1]) {
				ret[capture[1].toLowerCase()] = capture[2];
			}
		});

		return ret;
	},

	parseStatus: function(str) {
		// An array of the properties I want to
		// extract from the response from mpd
		var props = [
			'volume',
			'state',
			'artist',
			'album',
			'title',
			'elapsed',
			'duration',
			'repeat',
			'random',
			'time'
		];
		var obj = this.parseProps(str, props);
		// Some of the props need to be integers
		obj.elapsed = parseInt(obj.elapsed);
		obj.time    = parseInt(obj.time);
		obj.repeat  = parseInt(obj.repeat);
		obj.random  = parseInt(obj.random);
		obj.volume  = parseInt(obj.volume);

		return obj;
	},

	parsePlaylist: function(str) {
		// Each song begins with a file property
		// so splitting the string at a new line
		// followed by file: seperates the songs
		var songs = str.split(/\n(?=file:)/);
		var playlist = [];

		songs.forEach(function(song) {
			var props = [
				'file',
				'artist',
				'album',
				'genre',
				'title',
				'time',
				'id'
			];
			var obj = this.parseProps(song, props);

			// The last index in the lines array will be
			// an empty string and we don't want that in
			// our playlist
			if (obj.hasOwnProperty('time')) {
				// Converting time from seconds to minutes:seconds
				var seconds = parseInt(obj.time);
				var h = Math.floor(seconds / 60);
				var s = seconds % 60;
				// Adding 0 padding because 03:05 looks nicer than 3:5
				obj.time = (h < 10 ? '0' : '') + h + ':' + (s < 10 ? '0' : '') + s;

				playlist.push(obj);
			}
		}.bind(this));

		return playlist;
	}

};

module.exports = mpdparser;
