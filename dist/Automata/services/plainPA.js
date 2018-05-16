"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPlain = toPlain;

var _PA = require("../PA/PA");

var _PA2 = _interopRequireDefault(_PA);

var _Automata = require("../Automata");

var _Automata2 = _interopRequireDefault(_Automata);

var _plainFA = require("./plainFA");

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

    var result = (0, _plainFA.extendableToPlain)(automata, prefix, { ruleParser: plainPARule });
    // $FlowFixMe
    result = result;
    return additionalPA(automata, prefix, result);
}

/**
 * Speciální atributy Zásobníkového automatu
 * @param automata
 * @param prefix
 * @param result
 * @return {T_PlainPA}
 */
function additionalPA(automata, prefix, result) {
    result.initialStackSymbol = automata.initialStackSymbol;
    result.stackAlphabet = [].concat(_toConsumableArray(automata.stackAlphabet));
    return result;
}

/**
 * Zpracovávání pravidel zásbníkového automatu
 * @param automata
 * @param prefix
 * @return {Array}
 */
function plainPARule(automata, prefix) {
    return automata.rules.map(function (rule) {
        return {
            from: { state: { name: prefix + rule.from.state.name }, stackTop: rule.from.stackTop },
            to: { state: { name: prefix + rule.to.state.name }, stackTop: rule.to.stackTop },
            symbol: rule.symbol
        };
    });
}