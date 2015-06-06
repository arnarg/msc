var gulp = require('gulp');

var jshint   = require('gulp-jshint');
var less     = require('gulp-less');
var electron = require('gulp-electron');
var concat   = require('gulp-concat');
var install  = require('gulp-install');
var runElectron = require('gulp-run-electron');

gulp.task('package', ['compile', 'install'], function() {
	return gulp.src('')
			.pipe(electron({
				src: './dest',
				packageJson: require('./dest/package.json'),
				release: './release',
				cache:   './cache',
				version: 'v0.27.2',
				packaging: true,
				platforms: ['darwin-x64', 'linux-x64']
			}))
			.pipe(gulp.dest(''));
});

gulp.task('run', ['compile', 'install'], function() {
	return gulp.src('dest')
			.pipe(runElectron([], {}));
});

gulp.task('install', ['compile'], function() {
	return gulp.src('./dest/package.json')
			.pipe(install({production: true}));
});

gulp.task('jshint', function() {
	return gulp.src('./src/js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
	return gulp.src('./src/less/style.less')
			.pipe(less())
			.pipe(gulp.dest('dest'));
});

gulp.task('mvfiles', ['jshint'], function() {
	return gulp.src([
		'./src/js/*.js',
		'./src/*.html',
		'package.json'
	]).pipe(gulp.dest('dest'));
});

gulp.task('mvimgs', function() {
	return gulp.src('./src/img/*.png')
			.pipe(gulp.dest('dest/img'));
})

gulp.task('compile', ['mvfiles', 'mvimgs', 'less']);

gulp.task('default', ['jshint', 'compile', 'install', 'run']);
