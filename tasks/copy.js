module.exports = {
	main: {
		cwd: 'src',
		src: 'main.js',
		dest: 'dest',
		expand: true
	},
	player: {
		cwd: 'src/player',
		src: ['index.html', 'img/background.png'],
		dest: 'dest/player',
		expand: true
	},
	playlist: {
		cwd: 'src/playlist',
		src: 'index.html',
		dest: 'dest/playlist',
		expand: true
	},
	package: {
		cwd: './',
		src: 'package.json',
		dest: 'dest',
		expand: true
	}
};
