var asyncAdapter = (function () {
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var asyncAdapter = function asyncAdapter(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        var safeArgs = args.length > 0 ? args : fn.length === 1 ? new Array(fn.length).fill(null) : new Array(fn.length - 1).fill(null);
        try {
            if (fn.length > 1 && fn.length !== safeArgs.length) {
                fn.apply(undefined, _toConsumableArray(safeArgs).concat([resolve]));
            } else {
                resolve(fn.apply(undefined, _toConsumableArray(safeArgs)));
            }
        } catch (e) {
            reject(new Error(e));
        }
    });
};

return asyncAdapter;

}());
