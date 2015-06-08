var React    = require('react');
var MpdStore = require('./js/stores/MpdStore');
var MscApp   = require('./js/components/MscApp');

MpdStore.connect();

React.render(
	<MscApp />,
	document.getElementById('mscapp')
);
