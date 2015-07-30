module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src('./src/{player,playlist}/style/style.less')
				.pipe(plugins.less({
					paths: [ './src/shared/less' ]
				}))
				.pipe(gulp.dest('dest/'));
	}
};
