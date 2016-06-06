/**
 * Created by VVD at NorseDigital on 6/6/16.
 */
module.exports = function(grunt) {
  "use strict";
  require('load-grunt-tasks')(grunt);

  //Project configuration
  grunt.initConfig({

    //Cleans the default folders
    clean: ['build/*'],

    copy: {
      files: {
        expand: true,
        cwd: 'src',
        src: [
          'images/**/*',
          'js/**/*'
        ],
        dest: 'build',
        file: 'isFile'
      }
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          'build/stylesheets/style.min.css' : 'src/sass/main.scss'
        }
      }
    },

    includereplacemore: {
      dev: {
        options: {
          includeDir: 'src/html'
        },
        expand: true,
        cwd: 'src/html',
        src: '*.html',
        dest: 'build/'
      }
    },

    express: {
      all: {
        options: {
          hostname: 'localhost',
          port: 9998,
          bases: 'build'
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9998',
        app: '/usr/bin/google-chrome'
      }
    },

    watch: {
      configFiles: {
        files: [
          'src/html/**/*',
          'src/sass/**/*',
          'src/images/**/*',
          'src/js/**/*'
        ],
        tasks: ['copy', 'sass', 'includereplacemore'],
        options: {
          livereload: true
        }
      }
    }



  });

  grunt.registerTask('start', ['clean', 'copy', 'sass', 'includereplacemore', 'express', 'open', 'watch']);

};