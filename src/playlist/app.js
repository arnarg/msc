var React       = require('react');
var ipc         = require('ipc');
var PlaylistApp = require('./ts/components/PlaylistApp');
var PlaylistActions = require('./ts/actions/PlaylistActions');

ipc.on('playlist-update', function(data) {
	PlaylistActions.updatePlaylist(data.playlist);
});

React.render(
	React.createElement(PlaylistApp),
	document.getElementById('playlistapp')
);
