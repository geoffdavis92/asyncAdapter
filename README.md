# asyncAdapter

Take functions with a callback handler pattern and use them with `async/await`!

## The Problem

Let's say you have a legacy function that sends an `XMLHttpRequest` that sends data to a callback function argument, for example:

```javascript
function httpGET(endpoint, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  });
  xhr.open('GET', endpoint);
  xhr.send();
};
```

It has been a trusty sidekick, but it is a little outdated and makes using retrieved data more involved than current Javascript needs to be.

You want to use the latest and greatest APIs that tc39 and Babel can provide– like `async/await` or the `Promise` API– and callbacks just don't cut it.

What could you do?

## The Solution

Enter **asyncAdapter**. 
