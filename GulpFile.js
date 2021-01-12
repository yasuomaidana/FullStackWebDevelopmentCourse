'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', gulp.series(function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    }));
    
gulp.task('sass:watch', gulp.series(function () {
    gulp.watch('./css/*.scss', gulp.series('sass'));
    }));
    
gulp.task('browser-sync', gulp.series(function () {
        var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
        ];
    
        browserSync.init(files, {
        server: {
            baseDir: "./"
        }
        });
    
    }));
    
    // Default task
gulp.task('default', gulp.parallel('browser-sync','sass:watch'));
      
      