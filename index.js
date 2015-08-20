'use strict';

var Filter = require('broccoli-filter');

function UseStrictRemover (inputTree, _options) {
  if (!(this instanceof UseStrictRemover)) {
    return new UseStrictRemover(inputTree, _options);
  }

  var options = _options || {};
  var matcher = options.matcher || /REMOVE_USE_STRICT: true/g;

  delete options.matcher;
  Filter.call(this, inputTree, options);

  this.matcher = matcher;
}

UseStrictRemover.prototype = Object.create(Filter.prototype);
UseStrictRemover.prototype.constructor = UseStrictRemover;

UseStrictRemover.prototype.extensions = ['js'];
UseStrictRemover.prototype.targetExtension = 'js';

UseStrictRemover.prototype.processString = function(content) {
  var output = content;

  if (content.match(this.matcher)) {
    output = content.replace(/["']use strict['"];\n/g, '');
  }

  return output;
};

module.exports = UseStrictRemover;
