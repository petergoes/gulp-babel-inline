[![Build Status](https://travis-ci.org/unchai/gulp-babel-inline.svg?branch=master)](https://travis-ci.org/unchai/gulp-babel-inline)

# gulp-babel-inline
> Gulp plugin to transpile inline javascript via babel.

## Install

```shell
npm install --save-dev gulp-babel-inline
```

## API

### babelInline([*babelOptions*])

```javascript
var gulp = require('gulp');
var babelInline = require('gulp-babel-inline');
 
gulp.task('babel-inline', function() {
  return gulp.src('**/*.html')
    .pipe(babelInline({presets: ['es2015']}))
    .pipe(gulp.dest('dist'));
});
```

## License

MIT © 2017 [unchai](https://github.com/unchai)
