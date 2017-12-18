# asyncAdapter

Take functions with a callback pattern and use them with `async/await`!

## The Problem

Let's say you have a legacy function that creates an `XMLHttpRequest` which passes response data to a callback function, for example:

```javascript
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
```

It has been a trusty sidekick, but it is a little outdated and makes using retrieved data more involved than modern Javascript needs to be.

You want to use the latest and greatest APIs that tc39 and Babel can provide– like `async/await` or the `Promise` API– and callbacks just don't cut it.

What could you do?

## The Solution

Enter **`asyncAdapter`**. This nifty utility **_magically_** makes the function into a new `Promise`-based function, allowing it to be `await`-ed or otherwise handled like a Promise; this is achieved by passing in the Promise's `resolve` argument where the original function's callback would go.

(Okay so it is not exactly *magic*, but it's still pretty cool)

Here is how you would use the example function above with `asyncAdapter`:

```javascript
const asyncHttpGET = asyncAdapter(httpGET,'https://example.com/api/data');

(async function someAsyncFunction() {
  const data = await asyncHttpGET;
  console.log(data); // -> { foo: 'bar' }
})()
```

The **first argument** to the adapter is the original function name, and the **rest of the arguments** constitute any arguments you would pass to the original function, in the same order.

Note that you should **not** pass a function into the `asyncAdapter` arguments, unless that function can return a value (e.g. not for an AJAX/`Promise`-based function).

Here is an example of a non-asynchronous function being used with `asyncAdapter`:

```javascript
// Original function
const add = (n1,n2,callback) => callback(n1 + n2);

// Add callback function to return value
const asyncSum20 = asyncAdapter(add,10,10,n => n);

// Add callback function to return value with side effects
const asyncSum50 = asyncAdapter(add,10,10,n => n + 30);

// Use inside function to create DRY async version of original function
const asyncSum = (n1,n2,n3) => asyncAdapter(add,n1,n2, n => n + n3);

(async function someAsyncFunction() {
  const sum20 = await asyncSum20;
  const sum50 = await asyncSum50;
  const sum100 = await asyncSum(5,20,75);

  console.log(sum20); // -> 20
  console.log(sum50); // -> 50
  console.log(sum100); // -> 100
})
```