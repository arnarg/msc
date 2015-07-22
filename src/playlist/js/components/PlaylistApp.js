var React    = require('react');
var MpdStore = require('../stores/MpdStore');
var Playlist = require('./Playlist');

function getPlaylistState() {
	return {
		playlist: MpdStore.getPlaylist()
	};
}

var PlaylistApp = React.createClass({

	getInitialState: function() {
		return getPlaylistState();
	},

	componentDidMount: function() {
		MpdStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MpdStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var playlist = this.state.playlist;

		return (
			<div>
				<Playlist list={playlist} />
			</div>
		);
	},

	_onChange: function() {
		this.setState(getPlaylistState());
	}

});

module.exports = PlaylistApp;
