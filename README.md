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
factorial(5): 0.112ms
factorial(10): 0.0188ms
factorial(100): 0.122ms
Object.factorial(5)
  @time 0.127ms
  @type number
  @return 120
Object.obj()
  @time 0.192ms
  @type object
  @return {"hello":"world"}
hello
Console.log("hello"): 0.395ms
world
Console.log("world"): 0.0341ms
```
