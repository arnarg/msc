module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		ts: require('./tasks/ts'),
		copy: require('./tasks/copy')
	});

	grunt.registerTask("default", ["ts", "copy"]);
}
