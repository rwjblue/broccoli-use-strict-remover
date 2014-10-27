'use strict';

var Filter = require('broccoli-filter');

function UseStrictRemover (inputTree, options) {
  if (!(this instanceof UseStrictRemover)) {
    return new UseStrictRemover(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
  this.matcher = this.options.matcher || /REMOVE_USE_STRICT: true/g;
}

UseStrictRemover.prototype = Object.create(Filter.prototype);
UseStrictRemover.prototype.constructor = UseStrictRemover;

UseStrictRemover.prototype.extensions = ['js'];
UseStrictRemover.prototype.targetExtension = 'js';

UseStrictRemover.prototype.processString = function(content, relativePath) {
  var output = content;

  if (content.match(this.matcher)) {
    output = content.replace(/["']use strict['"];\n/g, '');
  }

  return output;
};

module.exports = UseStrictRemover;
