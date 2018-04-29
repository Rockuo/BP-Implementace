"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = uniqueConcatenation;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _concatenationFA = require("./concatenationFA");

var _concatenationFA2 = _interopRequireDefault(_concatenationFA);

var _differenceFA = require("./differenceFA");

var _differenceFA2 = _interopRequireDefault(_differenceFA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Concatenation(L, K) − L − K
function uniqueConcatenation(left, right) {
    return (0, _differenceFA2.default)((0, _differenceFA2.default)((0, _concatenationFA2.default)(left, right), left), right);
}