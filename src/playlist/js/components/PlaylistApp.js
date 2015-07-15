var React    = require('react');
var MpdStore = require('../stores/MpdStore');

function getPlaylistState() {
	return {
		playlist: MpdStore.getPlaylist()
	};
}

var PlaylistApp = React.createClass({

	getInitialState: function() {
		return getMscState();
	},

	componentDidMount: function() {
		MpdStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MpdStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div>Playlist</div>
		);
	},

	_onChange: function() {
		this.setState(getMscState());
	}

});
