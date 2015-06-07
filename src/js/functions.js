module.exports.parseMsg = function(msg) {
	var lines = msg.split('\n');
	var ret = {};

	lines.forEach(function(line) {
		var capture = /([A-Za-z_]+): (.+)/i.exec(line);
		if (capture) ret[capture[1]] = capture[2];
	});

	return ret;
}
