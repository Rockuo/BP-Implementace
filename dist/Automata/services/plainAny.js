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

var _plainAutomata = require('./plainAutomata');

var _plainPA = require('./plainPA');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
function toPlainLeft(automata) {
    return toPlain(automata, 'l_');
}

/**
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
function toPlainRight(automata) {
    return toPlain(automata, 'r_');
}

/**
 *
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
function toPlain(automata) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (automata instanceof _PA2.default) {
        return (0, _plainPA.toPlain)(automata, prefix);
    }
    return (0, _plainAutomata.toPlain)(automata, prefix);
}