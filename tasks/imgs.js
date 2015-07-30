module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src('./src/{player,playlist}/img/*.png', {base: './src/{player,playlist}'})
				.pipe(gulp.dest('dest/img/'));
	}
};
