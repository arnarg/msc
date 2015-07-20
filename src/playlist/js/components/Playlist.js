var React = require('react');
var PlaylistItem = require('./PlaylistItem');

var Playlist = React.createClass({

	render: function() {
		var list = this.props.list;
		var playlist = [];

		for (var i = 0; i < list.length; ++i) {
			playlist.push(
				<PlaylistItem song={list[i]} key={i} />
			);
		}

		return (
			<ul className='playlist'>
				{playlist}
			</ul>
		)
	}

});

module.exports = Playlist;
