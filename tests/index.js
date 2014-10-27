'use strict';

var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var broccoli = require('broccoli');

require('mocha-jshint')();

var UseStrictRemover = require('..');

describe('broccoli-use-strict-remover', function(){
  var fixturePath = path.join(__dirname, 'fixtures');
  var builder;

  afterEach(function() {
    if (builder) {
      return builder.cleanup();
    }
  });

  it('by default it removes `"use strict";` when `REMOVE_USE_STRICT: true` is found', function() {
    var inputPath = path.join(fixturePath, 'with-use-strict');
    var tree = new UseStrictRemover(inputPath);

    builder = new broccoli.Builder(tree);
    return builder.build()
      .then(function(results) {
        var outputPath = results.directory;
        var withDefaultMatcherContents = fs.readFileSync(path.join(outputPath, 'with-default-matcher.js'), { encoding: 'utf8'});
        var withoutDefaultMatcherContents = fs.readFileSync(path.join(outputPath, 'without-default-matcher.js'), { encoding: 'utf8'});

        expect(withDefaultMatcherContents).to.eql('\n// REMOVE_USE_STRICT: true\n\n"Well?";\n');
        expect(withoutDefaultMatcherContents).to.eql('"use strict";\n\n"Something goes here";\n');
      });
  });

  it('matcher can be configured', function() {
    var inputPath = path.join(fixturePath, 'with-custom-matcher');
    var tree = new UseStrictRemover(inputPath, {
      matcher: /BLOOP/
    });

    builder = new broccoli.Builder(tree);
    return builder.build()
      .then(function(results) {
        var outputPath = results.directory;
        var withDefaultMatcherContents = fs.readFileSync(path.join(outputPath, 'with-default-matcher.js'), { encoding: 'utf8'});
        var withoutDefaultMatcherContents = fs.readFileSync(path.join(outputPath, 'without-default-matcher.js'), { encoding: 'utf8'});

        expect(withDefaultMatcherContents).to.eql('\n// BLOOP\n\n"Well?";\n');
        expect(withoutDefaultMatcherContents).to.eql('"use strict";\n\n"Something goes here";\n');
      });
  });
});
