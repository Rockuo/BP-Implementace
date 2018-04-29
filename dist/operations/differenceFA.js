"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = difference;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _intersectionFA = require("./intersectionFA");

var _intersectionFA2 = _interopRequireDefault(_intersectionFA);

var _complementFA = require("./complementFA");

var _complementFA2 = _interopRequireDefault(_complementFA);

var _Alphabet = require("../Automata/Alphabet");

var _Alphabet2 = _interopRequireDefault(_Alphabet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Rozdíl
 * @param {FA} left
 * @param {FA} right
 */
function difference(left, right) {
  right = right.clone();
  right.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(right.alphabet), _toConsumableArray(left.alphabet))))();
  return (0, _intersectionFA2.default)(left, (0, _complementFA2.default)(right));
}