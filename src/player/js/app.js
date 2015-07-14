var React         = require('react');
var SettingsStore = require('./js/stores/SettingsStore');
var MpdStore      = require('./js/stores/MpdStore');
var MscApp        = require('./js/components/MscApp');

SettingsStore.init();
MpdStore.connect();

React.render(
	<MscApp />,
	document.getElementById('mscapp')
);
