module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src(['./src/*/ts/**/*.ts', './src/*/ts/**/*.tsx'])
				.pipe(plugins.typescript({
					outDir: 'dest',
					jsx: 'react',
					declarationFiles: false,
					target: 'es5',
					module: 'commonjs',
					typescript: require('typescript')
				}))
				.pipe(gulp.dest('dest'));
	}
};
