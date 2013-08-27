module.exports = function(grunt) {

    grunt.initConfig({
        jasmine: {
            test: {
                src: 'src/rbtree.js',
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['jasmine']);
};
