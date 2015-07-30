module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src([
			'./src/{player,playlist}/index.html',
			'./modules/*.js',
			'main.js',
			'package.json'
				])
				.pipe(gulp.dest('dest'));
	}
};
