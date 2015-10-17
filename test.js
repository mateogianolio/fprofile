(function() {
  'use strict';

  var time = require('./main.js');

  function factorial(n) {
    return n > 1 ? n * factorial(n - 1) : n;
  }

  var timedFunction = time(factorial);
  timedFunction(5);
  timedFunction(10);
  timedFunction(100);

  var testObject = {
    factorial: factorial,
    obj: function() {
      return { hello: 'world' };
    }
  };

  time(testObject, 0, true);
  testObject.factorial(5);
  testObject.obj();

  time(console);
  console.log('hello');
  console.log('world');
}());
