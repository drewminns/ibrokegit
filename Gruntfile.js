var path = require('path');

var stylesheetsDir = 'dev/styles/';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bowercopy: {
			options: {
				srcPrefix: 'bower_components'
			},
			scripts: {
				options: {
					destPrefix: 'dist/scripts/vendor'
				},
				files: {
					'jquery/jquery.min.js': 'jquery/jquery.min.js',
					'modernizr/modernizr.js': 'modernizr/modernizr.js',
					'angular/angular.min.js': 'angular/angular.min.js',
					'angular-dropdowns/angular-dropdowns.min.js': 'angular-dropdowns/dist/angular-dropdowns.min.js',
					'angular-animate/angular-animate.min.js': 'angular-animate/angular-animate.min.js',
				}
			}
		},
		jade: {
			html: {
				files: {
					'dist/': ['dev/templates/*.jade']
				},
				options: {
					client: false
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dist/'
				}
			}
		},
		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: [
					'javascript/*.js'
				],
				dest: 'dist/scripts/main.min.js'
			},
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'dist/scripts/main.min.js': ['dev/javascript/app.js']
				}
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'dist/css/main.css': stylesheetsDir + 'main.scss'      // 'destination': 'source'
				}
			}
		},
		svginject: {
			all : {
				options: {},
				files: {
					 'dist/scripts/svginject.js': ['dist/css/svg/*.svg'],
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'dist/css/main.css'
			}
		},
		uncss: {
			dist: {
				files: {
					'dist/css/main.css' : ['dist/index.html']
				}
			},
			options: {
				ignore: ['#loading-bar*']
			}
		},
		watch: {
			js: {
				files: ['dev/javascript/*.js'],
				tasks: ['concat:js', 'uglify:js'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['dev/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true
				}
			},
			jade: {
				files: ['dev/templates/*.jade', 'dev/templates/includes/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-svginject');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-uncss');
	// Run the server and watch for file changes
	grunt.registerTask('default', ['jade', 'connect',  'concat', 'uglify', 'sass', 'watch']); // Build Tasks
	grunt.registerTask('clean', ['uncss', 'autoprefixer', ]); // Deploy build tasks
	grunt.registerTask('inject', ['bowercopy', 'svginject']); // Inject Bower and SVG tools
};