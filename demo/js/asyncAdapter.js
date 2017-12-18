var asyncAdapter = (function () {
'use strict';

const asyncAdapter = (fn, ...args) => {
    return new Promise((resolve, reject) => {
        const safeArgs = args.length > 0
            ? args
            : fn.length === 1
                ? new Array(fn.length).fill(null)
                : new Array(fn.length - 1).fill(null);
        try {
            if (fn.length > 1 && fn.length !== safeArgs.length) {
                fn(...safeArgs, resolve);
            }
            else {
                resolve(fn(...safeArgs));
            }
        }
        catch (e) {
            reject(new Error(e));
        }
    });
};

return asyncAdapter;

}());
