var gulp = require('gulp');

var jshint   = require('gulp-jshint');
var less     = require('gulp-less');
var electron = require('gulp-electron');
var concat   = require('gulp-concat');

gulp.task('less', function() {
	return gulp.src('./less/style.less')
			.pipe(less())
			.pipe(gulp.dest(''));
})
