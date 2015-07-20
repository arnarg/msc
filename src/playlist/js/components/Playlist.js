var React = require('react');

var Playlist = React.createClass({

	render: function() {
		var playlist = [];

		this.props.list.forEach(function(song, i) {
			playlist.push(
				<li key={i}>
					<div className='playBtn'><i className='fa fa-play'></i></div>
					<div className='artist'>{song.artist}</div>
					<div className='title'>{song.title}</div>
					<div className='album'>{song.album}</div>
					<div className='time'>{song.time}</div>
				</li>
			);
		});

		return (
			<ul className='playlist'>
				{playlist}
			</ul>
		)
	}

});

module.exports = Playlist;
