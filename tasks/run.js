module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src('dest')
				.pipe(plugins.runElectron(['--v=-1'], {}));
	}
};
