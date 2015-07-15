var React    = require('react');
var MpdStore = require('../stores/MpdStore');

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
		var playlist = [];

		this.state.playlist.forEach(function(item, i) {
			console.log(item);
			playlist.push(
				<li key={i}>{item.artist} - {item.title} ({item.album}) - {item.time}</li>
			);
		});

		return (
			<div>
				<ol>
					{playlist}
				</ol>
			</div>
		);
	},

	_onChange: function() {
		this.setState(getPlaylistState());
	}

});

module.exports = PlaylistApp;
