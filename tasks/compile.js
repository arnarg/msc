module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src(['./src/*/ts/**/*.ts', './src/*/ts/**/*.tsx'])
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.typescript({
					outDir: 'dest',
					jsx: 'react',
					declarationFiles: false,
					target: 'es5',
					module: 'commonjs'
				}))
				.pipe(plugins.sourcemaps.write())
				.pipe(gulp.dest('dest'));
	}
};
