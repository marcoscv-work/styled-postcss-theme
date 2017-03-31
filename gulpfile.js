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

liferayThemeTasks.registerTasks({
	gulp: gulp,
	hookFn: function(gulp) {
		gulp.hook('after:build:remove-old-css-dir', function(done) {
			runSequence(
				'build:autoprefixer'
			)
		});
	}
});