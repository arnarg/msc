var React       = require('react');
var ipc         = require('ipc');
var PlaylistApp = require('./scripts/components/PlaylistApp');
var MpdActions = require('./scripts/actions/MpdActions');

React.render(
	React.createElement(PlaylistApp),
	document.getElementById('playlistapp')
);
