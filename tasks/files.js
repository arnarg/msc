module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src([
			'./src/{player,playlist}/index.html',
			'./src/{player,playlist}/app.js',
			'./modules/*.js',
			'main.js',
			'package.json'
				])
				.pipe(gulp.dest('dest'));
	}
};
