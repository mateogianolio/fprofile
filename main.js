(function() {
  'use strict';
  require('terminal-colors');

  var microtime = require('microtime');

  function format(argument) {
    if (typeof argument === 'undefined')
      return 'null';
    else if (typeof argument === 'string')
      return '"' + argument + '"';
    else if (typeof argument === 'object')
      return JSON.stringify(argument);
    else
      return argument;
  }

  function attach(func, name, threshold, verbose) {
    return function() {
      var before = microtime.nowDouble(),
          result = func.apply(null, arguments),
          output = result ? format(result).toString() : 'none',
          time = parseFloat(((microtime.nowDouble() - before) * 1000).toPrecision(3));

      if (time > threshold) {
        var args = Array.prototype.slice
          .call(arguments)
          .map(format);

        process.stdout.write(name.bold + '(' + args.join(', ') + ')');

        if (verbose) {
          process.stdout.write('\n  @time ' + (time + 'ms').green);
          process.stdout.write('\n  @type ' + (typeof result).bold);
          process.stdout.write('\n  @return ' + output.bold);
          process.stdout.write('\n');
        } else {
          process.stdout.write(': ' + (time + 'ms').green);
          process.stdout.write('\n');
        }
      }

      return result;
    };
  }

  module.exports = function(object, threshold, verbose) {
    threshold = threshold || 0;
    verbose = verbose || false;

    if (typeof object === 'function')
      return attach(object, object.name, threshold, verbose);

    for (var name in object) {
      if (!object.hasOwnProperty(name))
        continue;

      var func = object[name];
      if (typeof func !== 'function')
        continue;

      threshold = threshold || 0;
      try {
        object[name] = attach(
          func,
          object.constructor.name + '.' + name,
          threshold,
          verbose
        );
      } catch (error) {}
    }

    return object;
  };
}());
