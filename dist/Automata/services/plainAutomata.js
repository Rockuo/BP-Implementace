'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPlain = toPlain;
exports.extendableToPlain = extendableToPlain;

var _Automata = require('../Automata');

var _Automata2 = _interopRequireDefault(_Automata);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
function toPlain(automata) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return extendableToPlain(automata, prefix, {});
}

//$FlowFixMe
function extendableToPlain(automata) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var _ref = arguments[2];
    var _ref$stateParser = _ref.stateParser,
        stateParser = _ref$stateParser === undefined ? plainAutomataState : _ref$stateParser,
        _ref$ruleParser = _ref.ruleParser,
        ruleParser = _ref$ruleParser === undefined ? plainAutomataRule : _ref$ruleParser;

    var initialState = {},
        finalStates = [],
        alphabet = [].concat(_toConsumableArray(automata.alphabet));

    _lodash2.default.each(automata.states, function (state) {
        if (state.isInitial) {
            initialState.name = prefix + state.name;
        }
        if (state.isFinal) {
            finalStates.push({ name: prefix + state.name });
        }
    });
    var states = stateParser(automata, prefix);

    var rules = ruleParser(automata, prefix);

    return { states: states, alphabet: alphabet, initialState: initialState, rules: rules, finalStates: finalStates };
}

function plainAutomataRule(automata, prefix) {
    return _lodash2.default.map(automata.rules, function (rule) {
        return {
            from: { state: { name: prefix + rule.from.state.name } },
            to: { state: { name: prefix + rule.to.state.name } },
            symbol: rule.symbol
        };
    });
}

function plainAutomataState(automata, prefix) {
    return _lodash2.default.map(automata.states, function (state) {
        return { name: prefix + state.name };
    });
}