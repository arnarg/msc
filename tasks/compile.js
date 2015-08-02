module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src(['./src/{player,playlist}/scripts/**/*.ts',
						'./src/{player,playlist}/scripts/**/*.tsx',
						'./src/main/**/*.ts'])
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
