'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _State = require('./State/State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @type {Rule}
 */
var Rule =

/**
 *
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

// equals(rule: Rule) {
//     return (
//         this.from.state.equals(rule.from.state) &&
//         this.from.stackTop === rule.from.stackTop &&
//         this.to.state.equals(rule.to.state) &&
//         this.to.stackTop === rule.to.stackTop &&
//         this.symbol === rule.symbol
//     );
// }
;

exports.default = Rule;
;