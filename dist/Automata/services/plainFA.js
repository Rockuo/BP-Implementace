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

var _FA = require('../FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _object = require('./object');

var _State = require('../State/State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Převádí Konečný automat na jeho čistou objektovou reprezentaci
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
function toPlain(automata) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return extendableToPlain(automata, prefix, {});
}

/**
 * Rozšířitelná metoda, zpracovávající automat
 * @param automata
 * @param prefix
 * @param stateParser
 * @param ruleParser
 * @return {{states: *, alphabet: *[], initialState, rules: *, finalStates: Array}}
 */
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
    //zpracuje základní hodnoty sstavů jako jsou initial a final
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _object.objectValues)(automata.states)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var state = _step.value;

            if (state.isInitial) {
                initialState.name = prefix + state.name;
            }
            if (state.isFinal) {
                finalStates.push({ name: prefix + state.name });
            }
        }
        // předá zpracování pro stavy a přechody
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var states = stateParser(automata, prefix);
    var rules = ruleParser(automata, prefix);

    return { states: states, alphabet: alphabet, initialState: initialState, rules: rules, finalStates: finalStates };
}

/**
 * Funkce zpracující přechody Konečného automatu
 * @param automata
 * @param prefix
 * @return {Array}
 */
function plainAutomataRule(automata, prefix) {
    return automata.rules.map(function (rule) {
        return {
            from: { state: { name: prefix + rule.from.state.name } },
            to: { state: { name: prefix + rule.to.state.name } },
            symbol: rule.symbol
        };
    });
}

/**
 * Funkce zpracující stavy FA
 * @param automata
 * @param prefix
 * @return {Array}
 */
function plainAutomataState(automata, prefix) {
    return (0, _object.objectValues)(automata.states).map(function (state) {
        return { name: prefix + state.name };
    });
}