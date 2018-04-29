"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseFA;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _plainFA = require("../Automata/services/plainFA");

var _Rule = require("../Automata/Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _object = require("../Automata/services/object");

var _State = require("../Automata/State/State");

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reverseFA(fa) {
    var newFA = new _FA2.default((0, _plainFA.toPlain)(fa));
    newFA.forceOneFinalState();
    var newInitial = (0, _object.objectValues)(newFA.finalStates)[0];
    newInitial.isFinal = false;
    newInitial.isInitial = true;
    var newFinal = newFA.initialState;
    newFinal.isInitial = false;
    newFinal.isFinal = true;
    newFA.finalStates = _defineProperty({}, newFinal.name, newFinal);
    newFA.initialState = newInitial;

    newFA.rules = newFA.rules.map(function (rule) {
        return new _Rule2.default({ from: rule.to, to: rule.from, symbol: rule.symbol });
    });
    return newFA;
}