'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPlainLeft = toPlainLeft;
exports.toPlainRight = toPlainRight;
exports.toPlain = toPlain;

var _Automata = require('../Automata');

var _Automata2 = _interopRequireDefault(_Automata);

var _PA = require('../PA/PA');

var _PA2 = _interopRequireDefault(_PA);

var _plainFA = require('./plainFA');

var _plainPA = require('./plainPA');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vrapne toPlain s prefixem l_ pro lepší čtení plain
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
function toPlainLeft(automata) {
    return toPlain(automata, 'l_');
}

/**
 * Vrapne toPlain s prefixem r_ pro lepší čtení plain
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
function toPlainRight(automata) {
    return toPlain(automata, 'r_');
}

/**
 * Vrapuje plain metody pro FA a PA
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
function toPlain(automata) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (automata instanceof _PA2.default) {
        return (0, _plainPA.toPlain)(automata, prefix);
    }
    // $FlowFixMe
    return (0, _plainFA.toPlain)(automata, prefix);
}