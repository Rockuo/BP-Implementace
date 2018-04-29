"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fullAlphabetDeletion;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _plainFA = require("../Automata/services/plainFA");

var _Rule = require("../Automata/Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _object = require("../Automata/services/object");

var _State = require("../Automata/State/State");

var _State2 = _interopRequireDefault(_State);

var _Alphabet = require("../Automata/Alphabet");

var _Alphabet2 = _interopRequireDefault(_Alphabet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Smazání abecedy (posloupnosti symbolů) z Konečného automatu
 * @param {FA} fa
 * @param {Alphabet} alphabet
 * @return {FA}
 */
function fullAlphabetDeletion(fa, alphabet) {
  var newFA = new _FA2.default((0, _plainFA.toPlain)(fa));
  newFA.rules.forEach(function (rule) {
    if (alphabet.includes(rule.symbol)) rule.symbol = '';
  });
  return newFA;
}