"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = differentUnion;

var _union = require("./union");

var _union2 = _interopRequireDefault(_union);

var _DFA = require("../Automata/FA/DFA");

var _DFA2 = _interopRequireDefault(_DFA);

var _differenceFA = require("./differenceFA");

var _differenceFA2 = _interopRequireDefault(_differenceFA);

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Rozdílné sjednocení
 * @param  left
 * @param  right
 */
function differentUnion(left, right) {
    var diff1 = _DFA2.default.covertFromFA((0, _differenceFA2.default)(left, right));
    var diff2 = _DFA2.default.covertFromFA((0, _differenceFA2.default)(right, left));
    // Pokud DFA rozdílu nemá koncové stavy => L1-L2 ={} && L2-L1 ={} => L1=L2
    if (Object.keys(diff1.finalStates).length !== 0 || Object.keys(diff2.finalStates).length !== 0) {
        // $FlowFixMe
        return (0, _union2.default)(left, right);
    }
}