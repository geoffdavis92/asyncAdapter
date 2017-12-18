var asyncAdapter = (function () {
'use strict';

const asyncAdapter = (fn, ...params) => new Promise((resolve, reject) => {
    const safeParams = params.length > 0
        ? params
        : fn.length === 1
            ? new Array(fn.length).fill(null)
            : new Array(fn.length - 1).fill(null);
    try {
        (fn.length > 1 &&
            fn.length !== safeParams.length &&
            fn(...safeParams, resolve)) ||
            resolve(fn(...safeParams));
    }
    catch (e) {
        reject(e);
    }
});

return asyncAdapter;

}());
