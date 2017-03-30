'use strict';

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulp = require('gulp');
var liferayThemeTasks = require('liferay-theme-tasks');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence').use(gulp);

liferayThemeTasks.registerTasks({
	gulp: gulp
});

gulp.task('build:autoprefixer', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./build/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('build', function(cb) {
	runSequence(
		'build:clean',
		'build:base',
		'build:src',
		'build:web-inf',
		'build:liferay-look-and-feel',
		'build:hook',
		'build:themelets',
		'build:rename-css-dir',
		'build:prep-css',
		'build:compile-css',
		'build:fix-url-functions',
		'build:move-compiled-css',
		'build:remove-old-css-dir',
		'build:autoprefixer',
		'build:fix-at-directives',
		'build:r2',
		'build:war',
		cb
	);
});