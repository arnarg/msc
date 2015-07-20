var nconf = require('nconf');
var path = require('path');

module.exports = function(ipc) {
	nconf.use('file', {file: path.join(app.getPath('userData'), 'config.json')});
	nconf.load();

	ipc.on('save-settings', function(event, arg) {
		nconf.set('host', arg.host);
		nconf.set('port', (typeof arg.port === 'string' ? parseInt(arg.port) : arg.port));
		nconf.save(function(err) {
			var settings = {
				host: nconf.get('host'),
				port: nconf.get('port')
			};
			event.sender.send('save-settings', (err ? 'error' : settings));
		});
	});

	ipc.on('get-settings', function(event, arg) {
		event.returnValue = {
			host: nconf.get('host') || 'localhost',
			port: nconf.get('port') || 6600
		};
	});

	return {
		host: nconf.get('host'),
		port: nconf.get('port')
	};
};
