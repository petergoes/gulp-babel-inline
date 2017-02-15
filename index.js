const through = require('through2');
const babel = require('babel-core');
const replacestream = require('replacestream');

module.exports = function (opts) {
  var scriptTagRegex = /<[^/>]*script[ ]*type[ ]*=['|"].*?['|"].*?>([\s\S]*)?<\/[^/>]*script>/i;
  var options = opts || {};

  function transform(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      var contents = file.contents.toString();
      var scriptBody = contents.match(scriptTagRegex)[1];
      var transpiledResult = babel.transform(scriptBody, options);
      var transpiledScript = '\n' + transpiledResult.code + '\n';

      file.contents = new Buffer(contents.replace(scriptBody, transpiledScript));

      return callback(null, file);
    }

    callback(null, file);
  }

  return through.obj(transform);
};
