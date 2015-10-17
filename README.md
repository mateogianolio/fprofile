# fprofile

Simple logging / performance evaluation of functions.

### Install

```bash
$ npm install fprofile
```

### Usage

[test.js](https://github.com/mateogianolio/fprofile/blob/master/test.js) contains a few examples:

```javascript
var profile = require('./main.js');

function factorial(n) {
  return n > 1 ? n * factorial(n - 1) : n;
}

var timedFunction = profile(factorial);
timedFunction(5);
timedFunction(10);
timedFunction(100);

var testObject = {
  factorial: factorial,
  obj: function() {
    return { hello: 'world' };
  }
};

profile(testObject, 0, true);
testObject.factorial(5);
testObject.obj();

profile(console);
console.log('hello');
console.log('world');
```

```bash
$ node test.js
```

<img width="100%" height="auto" title="test output" align="left" src="https://github.com/mateogianolio/fprofile/blob/master/screenshot.png">
