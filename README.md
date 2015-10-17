# fprofile

Simple logging / performance evaluation of functions.

### Install

```bash
$ npm install fprofile
```

### Usage

Look, [test.js](https://github.com/mateogianolio/fprofile/blob/master/test.js) contains a few examples:

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

Running the code above outputs:

```bash
$ node test.js
factorial(5): 0.133ms
factorial(10): 0.02ms
factorial(100): 0.232ms
Object.factorial(5)
  @time 0.194ms
  @type number
  @return 120
Object.obj()
  @time 0.21ms
  @type object
  @return {"hello":"world"}
hello
Console.log("hello"): 0.375ms
world
Console.log("world"): 0.0329ms
```

Contribute if you want.
