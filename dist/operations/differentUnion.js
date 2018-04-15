'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differentUnion;

var _Automata = require('../Automata/Automata');

var _Automata2 = _interopRequireDefault(_Automata);

var _union = require('./union');

var _union2 = _interopRequireDefault(_union);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param  Left
 * @param  Right
 * @param automataType
 */
function differentUnion(Left, Right) {
  var automataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Automata2.default;

  return Left.equals(Right) ? undefined : (0, _union2.default)(Left, Right, automataType);
}