"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = operationDifferent;

var _union2 = require("./union");

var _union3 = _interopRequireDefault(_union2);

var _differenceFA = require("./differenceFA");

var _differenceFA2 = _interopRequireDefault(_differenceFA);

var _intersectionFA = require("./intersectionFA");

var _intersectionFA2 = _interopRequireDefault(_intersectionFA);

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param  left
 * @param  right
 */
function operationDifferent(left, right) {
  // $FlowFixMe
  var _union = (0, _union3.default)(left, right);
  return (0, _differenceFA2.default)(_union, (0, _intersectionFA2.default)(left, right));
}