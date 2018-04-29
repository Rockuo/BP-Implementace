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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *
 * @param  Left
 * @param  Right
 * @param automataType
 */
function union(Left, Right) {
    // $FlowFixMe
    Left = Left;
    // $FlowFixMe
    Right = Right;

    var plainLeft = (0, _plainFA_OR_PA.toPlainLeft)(Left),
        plainRight = (0, _plainFA_OR_PA.toPlainRight)(Right);
    // přidání pravidel s prázdnými přechody
    var rules = [{ from: { state: { name: 's' } }, to: { state: { name: plainLeft.initialState.name } }, symbol: '' }, { from: { state: { name: 's' } }, to: { state: { name: plainRight.initialState.name } }, symbol: '' }];

    var _arr = [].concat(_toConsumableArray(plainLeft.finalStates), _toConsumableArray(plainRight.finalStates));

    for (var _i = 0; _i < _arr.length; _i++) {
        var finalState = _arr[_i];
        rules.push({
            from: { state: { name: finalState.name } },
            to: { state: { name: 'f' } },
            symbol: ''
        });
    }

    var plainUnion = {
        states: [{ name: 's' }, { name: 'f' }].concat(_toConsumableArray(plainLeft.states), _toConsumableArray(plainRight.states)),
        alphabet: [].concat(_toConsumableArray(plainLeft.alphabet), _toConsumableArray(plainRight.alphabet)),
        rules: [].concat(rules, _toConsumableArray(plainLeft.rules), _toConsumableArray(plainRight.rules)),
        finalStates: [{ name: 'f' }],
        initialState: { name: 's' }
    };

    var paFun = function paFun(l, r) {
        additional(l, r, plainUnion);
    };
    (0, _overload.overload)([{ parameters: [{ value: Left, type: _FA2.default }, { value: Right, type: _PA2.default }], func: paFun }, { parameters: [{ value: Left, type: _PA2.default }, { value: Right, type: _FA2.default }], func: paFun }, { parameters: [{ value: Left, type: _PA2.default }, { value: Right, type: _PA2.default }], func: paFun }, { parameters: [{ value: Left, type: _FA2.default }, { value: Right, type: _FA2.default }], func: function func() {} }]);

    return new Left.constructor(plainUnion);
}

function additional(plainLeft, plainRight, plainUnion) {
    // $FlowFixMe
    plainLeft = plainLeft;
    // $FlowFixMe
    plainRight = plainRight;
    // $FlowFixMe
    plainUnion = plainUnion;

    plainUnion.initialStackSymbol = '';
    plainUnion.stackAlphabet = [].concat(_toConsumableArray(plainLeft.stackAlphabet), _toConsumableArray(plainRight.stackAlphabet));
}