/* jshint node: true */
/* global describe, it */
'use strict';

const gulp = require('gulp');
const babelInline = require('../index');

describe('gulp-babel-inline', () => {
  it('testcase 01', (done) => {
    gulp.src('test/assets/test01.html')
      .pipe(babelInline({presets: ['es2015']}))
      .on('data', (file) => {
      })
      .once('end', () => {
        done();
      });
  });
});
