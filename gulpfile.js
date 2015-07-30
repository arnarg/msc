var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({
	rename: {
		'gulp-run-electron': 'runElectron'
	}
});

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins);
}

gulp.task('package', ['compile', 'install'], getTask('package'));
gulp.task('run', ['compile', 'install'], getTask('run'));
gulp.task('install', ['compile'], getTask('install'));
gulp.task('less', getTask('less'));
gulp.task('files', getTask('files'));
gulp.task('imgs', getTask('imgs'));
gulp.task('compile', getTask('compile'));

gulp.task('jshint', function() {
	return gulp.src([
		'!./src/js/components/*.js',
		'!./src/js/app.js',
		'./src/js/**/*.js',
		'main.js'
			])
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function() {
	return gulp.src('./src/player/js/**/*.js')
			.pipe(plugins.react())
			.on('error', console.log.bind(console))
			.pipe(gulp.dest('dest/player/js'));
});

gulp.task('compile2', ['compile', 'scripts', 'files', 'imgs', 'less']);

gulp.task('default', ['jshint', 'compile2', 'install', 'run']);
