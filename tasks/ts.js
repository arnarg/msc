module.exports = {
	main: {
		src: ['src/main/*.ts'],
		out: 'dest/main',
		options: {
			module: 'commonjs',
			target: 'es5',
			sourceMap: false,
			declaration: false
		}
	}
};
