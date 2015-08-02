var React       = require('react');
var ipc         = require('ipc');
var PlaylistApp = require('./scripts/components/PlaylistApp');
var MpdActions = require('./scripts/actions/MpdActions');

ipc.on('playlist-update', function(data) {
	MpdActions.updatePlaylist(data.playlist);
});

React.render(
	React.createElement(PlaylistApp),
	document.getElementById('playlistapp')
);
