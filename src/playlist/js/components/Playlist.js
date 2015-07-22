var React = require('react');
var PlaylistItem = require('./PlaylistItem');
var PlaylistActions = require('../actions/PlaylistActions');
var $ = require('jquery');

var Playlist = React.createClass({

	_play: function(event) {
		// For some reason click handlers attached to
		// each PlaylistItem are not firing. Therefor
		// I'm using this hack.
		// TODO: fix
		var elem = $(event.target);
		// Clicked element is one of the two buttons
		if (elem.hasClass('fa-play') || elem.hasClass('fa-minus-circle')) {
			var songID = elem.closest('li').data('id');
			PlaylistActions.playSong({id: songID});
		}
	},

	render: function() {
		var list = this.props.list;
		playlist = [];

		for (var i = 0; i < list.length; ++i) {
			playlist.push(
				<PlaylistItem song={list[i]} key={list[i].id} />
			);
		}

		return (
			<ul className='playlist' onClick={this._play}>
				{playlist}
			</ul>
		)
	}

});

module.exports = Playlist;
