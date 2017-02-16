'use strict';

const through = require('through2');
const babel = require('babel-core');

module.exports = function (opts) {
  var scriptStartTagRegex = /<script[ ]*type[ ]*=['|"]([^'|"]*)?['|"].*?>/gm;
  var scriptEndTagRegex = /<\/[^/>]*script>/gm;
  var options = opts || {};

  function transform(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      var contents = String(file.contents);

      var startPosition = [];
      var endPosition = [];

      var match;
      while (match = scriptStartTagRegex.exec(contents)) {
        startPosition.push(match.index + match[0].length);
      }
      while (match = scriptEndTagRegex.exec(contents)) {
        endPosition.push(match.index);
      }

      if (startPosition.length === 0 || startPosition.length !== endPosition.length) {
        file.contents = new Buffer(contents);
        return callback(null, file);
      }

      var stack = [];
      startPosition.forEach((position, index) => {
        var beforePosition = (index === 0) ? 0 : endPosition[index - 1];
        stack.push(contents.slice(beforePosition, position));

        var scriptBody = contents.slice(position, endPosition[index]);
        var transpiledResult = babel.transform(scriptBody, options);
        stack.push(transpiledResult.code);
      });
      stack.push(contents.slice(endPosition[endPosition.length - 1], contents.length));

      file.contents = new Buffer(stack.join('\n'));
    }

    callback(null, file);
  }

  return through.obj(transform);
};
