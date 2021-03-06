/* eslint no-debugger: 0 */
"use strict";
const resolveId = require('postcss-import/lib/resolve-id.js');
const AtImport = require('postcss-import');
const resolve = require('import-sub');

function sub(options) {
  /**
   * Support simple mode of rules definition
   */
  let rules;
  if (options instanceof Array) {
    rules = options;
    options = {};
  } else {
    rules = options.sub || options.redirect;
    delete options.sub;
    delete options.redirect;
  }

  options.originalResolve = resolveId;
  /**
   * Define real options
   */
  return Object.assign({}, options, {
    resolve: function(id, base, importOptions) {
      return resolve(rules, Object.assign(
        {},
        options,
        {
          base: base,
          request: id,
          importOptions: importOptions || {},
        }
      ));
    }
  });
}

module.exports = function substitute(options) {
  return AtImport(sub(options));
}

module.exports.sub = sub;
module.exports.process = AtImport.process;
module.exports.postcss = AtImport.postcss;
module.exports.AtImport = AtImport;
