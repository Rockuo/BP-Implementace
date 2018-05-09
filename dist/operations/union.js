'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = union;

var _Automata = require('../Automata/Automata');

var _Automata2 = _interopRequireDefault(_Automata);

var _plainFA_OR_PA = require('../Automata/services/plainFA_OR_PA');

var _PA = require('../Automata/PA/PA');

var _PA2 = _interopRequireDefault(_PA);

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _overload = require('../Automata/services/overload');

var _State = require('../Automata/State/State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Sjednocení dvou Automatů
 * @param {Automata} left
 * @param  {Automata} right
 * @return Automata
 */
function union(left, right) {
    //Nejprve řekneme Flow, o jak datový tym se jedná (Flow v tomto případě nezvládá přetypování samo)
    // $FlowFixMe
    left = left;
    // $FlowFixMe
    right = right;

    //Převedeme si automat na jeho serializovatelnou reprezentaci
    var plainLeft = (0, _plainFA_OR_PA.toPlainLeft)(left),
        plainRight = (0, _plainFA_OR_PA.toPlainRight)(right);

    // suffix pro nové stavy
    var suffix = _State2.default.randomName();

    //sestrojíme automat
    var plainUnion = {
        states: [{ name: 's' + suffix }].concat(_toConsumableArray(plainLeft.states), _toConsumableArray(plainRight.states)),
        alphabet: [].concat(_toConsumableArray(plainLeft.alphabet), _toConsumableArray(plainRight.alphabet)),
        finalStates: [].concat(_toConsumableArray(plainLeft.finalStates), _toConsumableArray(plainRight.finalStates)),
        initialState: { name: 's' + suffix }
    };

    // wrapper pro předávání parametrů
    var paFun = function paFun() {
        return additionalPA(plainLeft, plainRight, plainUnion, suffix);
    };
    // wrapper pro předávání parametrů
    var faFun = function faFun() {
        return additionalFA(plainLeft, plainRight, plainUnion, suffix);
    };

    // Nastavíme jaká funkce se má volat pro kterou kombinaci automatů
    //v tomto případě, pokud je jeden z automatů Zásobníkový, používáme funkci additionalPA
    return (0, _overload.overload)([{ parameters: [{ value: left, type: _FA2.default }, { value: right, type: _PA2.default }], func: paFun }, { parameters: [{ value: left, type: _PA2.default }, { value: right, type: _FA2.default }], func: paFun }, { parameters: [{ value: left, type: _PA2.default }, { value: right, type: _PA2.default }], func: paFun }, { parameters: [{ value: left, type: _FA2.default }, { value: right, type: _FA2.default }], func: faFun }]);
}

/**
 * Provede akce specifické pro zásobníkový automat
 * @param plainLeft
 * @param plainRight
 * @param plainUnion
 * @param suffix
 */
function additionalPA(plainLeft, plainRight, plainUnion, suffix) {
    // $FlowFixMe
    plainLeft = plainLeft;
    // $FlowFixMe
    plainRight = plainRight;
    // $FlowFixMe
    plainUnion = plainUnion;

    // nastavíme
    plainUnion.initialStackSymbol = 'S';
    plainUnion.stackAlphabet = ['S'].concat(_toConsumableArray(plainLeft.stackAlphabet), _toConsumableArray(plainRight.stackAlphabet));
    // Přidáme pravidla z nového počátečního stavu do původních počátečních stavů
    var rules = [{
        from: { state: { name: 's' + suffix }, stackTop: 'S' },
        to: { state: { name: plainLeft.initialState.name }, stackTop: plainLeft.initialStackSymbol },
        symbol: ''
    }, {
        from: { state: { name: 's' + suffix }, stackTop: 'S' },
        to: { state: { name: plainRight.initialState.name }, stackTop: plainLeft.initialStackSymbol },
        symbol: ''
    }];
    plainUnion.rules = [].concat(rules, _toConsumableArray(plainLeft.rules), _toConsumableArray(plainRight.rules));
    return new _PA2.default(plainUnion);
}

/**
 * Provede akce specifické pro konečný automat
 * @param plainLeft
 * @param plainRight
 * @param plainUnion
 * @param suffix
 */
function additionalFA(plainLeft, plainRight, plainUnion, suffix) {
    // Přidáme pravidla z nového počátečního stavu do původních počátečních stavů
    var rules = [{ from: { state: { name: 's' + suffix } }, to: { state: { name: plainLeft.initialState.name } }, symbol: '' }, { from: { state: { name: 's' + suffix } }, to: { state: { name: plainRight.initialState.name } }, symbol: '' }];
    plainUnion.rules = [].concat(rules, _toConsumableArray(plainLeft.rules), _toConsumableArray(plainRight.rules));
    return new _FA2.default(plainUnion);
}