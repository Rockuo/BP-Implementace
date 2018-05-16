'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Zásobník automatu
 * @type {Stack}
 * @property {string[]} stack
 */
var Stack = function () {
    function Stack(initialState) {
        _classCallCheck(this, Stack);

        this.stack = [initialState];
    }

    _createClass(Stack, [{
        key: 'peek',


        /**
         * Vrací vrchol zásobníku
         * @return {string}
         */
        value: function peek() {
            return this.stack[this.length - 1];
        }

        /**
         * Přepíše vrchop zásobníku, vrací true, pokud nedošlo k chybě
         * @param {string} expectedTop
         * @param {string} nextTop
         * @return {boolean}
         */

    }, {
        key: 'write',
        value: function write(expectedTop, nextTop) {
            if (expectedTop !== '') {
                if (expectedTop === this.peek()) {
                    this.stack.pop();
                } else {
                    return false;
                }
            }

            if (nextTop.length) {
                var _stack;

                (_stack = this.stack).push.apply(_stack, _toConsumableArray(nextTop.split('')));
            }
            return true;
        }
    }, {
        key: 'length',
        get: function get() {
            return this.stack.length;
        }
    }]);

    return Stack;
}();

exports.default = Stack;