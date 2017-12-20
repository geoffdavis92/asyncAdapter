# asyncAdapter

Take functions with a callback pattern and use them with `async/await`!

***NEW!*** [Read the article](https://dev.to/geoffdavis/adapting-those-callbacks-to-async-functions-3ihg) on [dev.to](https://dev.to/)

## Installation

Using yarn:

`yarn add async-adapter`

Using npm:

`npm i async-adapter`

The package has CommonJS and ECMAScript Module builds; just import the package the way your bundler supports:

```javascript
// ESM
import asyncAdapter from 'async-adapter';

// CommonJS
const asyncAdapter = require('async-adapter');
```

## Usage

The **first argument** to the adapter is the original function name, and the **rest of the arguments** constitute any arguments you would pass to the original function, in the same order.

Note that you should **not** pass a function in the callback parameter's position into the `asyncAdapter` arguments, unless that function can return a value (e.g. not for an AJAX/`Promise`-based function).

Here is an example of an asynchronous function being used with `asyncAdapter`:

```javascript
import asyncAdapter from 'async-adapter';

// Original funciton with callback
function httpGET(endpoint, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  });
  xhr.open("GET", endpoint);
  xhr.send();
}

const asyncHttpGET = asyncAdapter(httpGET, "https://example.com/api/data");

(async function someAsyncFunction() {
  const data = await asyncHttpGET;
  console.log(data); // -> { foo: 'bar' }
})();

```

Here is an example of a synchronous function being used with `asyncAdapter`:

```javascript
import asyncAdapter from 'async-adapter';

// Original function
const add = (n1, n2, callback) => callback(n1 + n2);

// Add callback function to return value
const asyncSum20 = asyncAdapter(add, 10, 10, n => n);

// Add callback function to return value with side effects
const asyncSum50 = asyncAdapter(add, 10, 10, n => n + 30);

// Use inside function to create DRY async version of original function
const asyncSum = (n1, n2, n3) => asyncAdapter(add, n1, n2, n => n + n3);

(async function someAsyncFunction() {
  const sum20 = await asyncSum20;
  const sum50 = await asyncSum50;
  const sum100 = await asyncSum(5, 20, 75);

  console.log(sum20); // -> 20
  console.log(sum50); // -> 50
  console.log(sum100); // -> 100
});
```

## License

[MIT](/LICENSE)