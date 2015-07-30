module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src('./dest/package.json')
				.pipe(plugins.install({production: true}));
	}
};
