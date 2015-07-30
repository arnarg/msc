module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src('')
				.pipe(plugins.electron({
					src: './dest',
					packageJson: require('./dest/package.json'),
					release: './release',
					cache:   './cache',
					version: 'v0.30.0',
					packaging: true,
					platforms: ['darwin-x64', 'linux-x64']
				}))
				.pipe(gulp.dest(''));
	}
};
