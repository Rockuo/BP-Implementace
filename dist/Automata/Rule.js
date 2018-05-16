'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State = require('./State/State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Pravidlo automatu
 * @type {Rule}
 * @property {{state:State, stackTop:string}} from
 * @property {{state:State, stackTop:string}} to
 * @property {string} symbol
 */
var Rule = function () {

    /**
     * @param {object}  plainRule
     * @param {boolean} hasStack
     */
    function Rule(_ref, hasStack) {
        var from = _ref.from,
            to = _ref.to,
            symbol = _ref.symbol;

        _classCallCheck(this, Rule);

        if (hasStack) {
            from.stackTop = from.stackTop || '';
            to.stackTop = to.stackTop || '';
        }
        this.from = from;
        this.to = to;
        this.symbol = symbol;
    }

    /**
     * @param {Rule} rule
     * @return {boolean}
     */


    _createClass(Rule, [{
        key: 'equals',
        value: function equals(rule) {
            return this.from.state.equals(rule.from.state) && this.from.stackTop === rule.from.stackTop && this.to.state.equals(rule.to.state) && this.to.stackTop === rule.to.stackTop && this.symbol === rule.symbol;
        }
    }]);

    return Rule;
}();

exports.default = Rule;
;