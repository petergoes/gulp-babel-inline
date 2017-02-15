/* jshint node:true */
'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src('test/main.js')
    .pipe(jshint({
      'esversion': 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(mocha());
});

gulp.task('default', ['test']);
