# broccoli-use-strict-remover

[![Build Status](https://travis-ci.org/rwjblue/broccoli-use-strict-remover.svg?branch=master)](https://travis-ci.org/rwjblue/broccoli-use-strict-remover)

Broccoli plugin that removes `'use strict';` from modules when `REMOVE_USE_STRICT: true` is present.

**DO NOT USE THIS OTHER THAN TO WORK AROUND [this](https://bugs.webkit.org/show_bug.cgi?id=138038) BUG.**

## Background

In some cases optimized Object.create in 'use strict' context sometimes breaks on ARMv7 iOS 8.x devices. This package
allows easier fine-grained removal of strict mode on a per-file basis.

In Ember we Work around the bug identified in https://bugs.webkit.org/show_bug.cgi?id=138038, by removing 'use strict'; from
modules where Object.create is called directly (in the case of Ember.CoreObject this occurs after inlining).

## ZOMG!!! TESTS?!?!!?

I know, right?

Running the tests:

```javascript
npm install
npm test
```

## License

This project is distributed under the MIT license.
