var React     = require('react');
var PlayerApp = require('./scripts/components/PlayerApp');
var MpdActions = require('./scripts/actions/MpdActions');
var ipc       = require('ipc');

ipc.on('update', function() {
	MpdActions.getStatus();
});

React.render(
	React.createElement(PlayerApp),
	document.getElementById('mscapp')
);
