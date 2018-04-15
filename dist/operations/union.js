'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = union;

var _Automata = require('../Automata/Automata');

var _Automata2 = _interopRequireDefault(_Automata);

var _plainAny = require('../Automata/services/plainAny');

var _PA = require('../Automata/PA/PA');

var _PA2 = _interopRequireDefault(_PA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *
 * @param  Left
 * @param  Right
 * @param automataType
 */
function union(Left, Right) {
    var automataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Automata2.default;

    var plainLeft = (0, _plainAny.toPlainLeft)(Left),
        plainRight = (0, _plainAny.toPlainRight)(Right);
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

    additional(plainLeft, plainRight, plainUnion, automataType);

    return new automataType(plainUnion);
}

function additional(plainLeft, plainRight, plainUnion, automataType) {
    if (automataType === _PA2.default) {
        // $FlowFixMe
        plainLeft = plainLeft;
        // $FlowFixMe
        plainRight = plainRight;
        // $FlowFixMe
        plainUnion = plainUnion;

        plainUnion.initialStackSymbol = '';
        plainUnion.stackAlphabet = [].concat(_toConsumableArray(plainLeft.stackAlphabet), _toConsumableArray(plainRight.stackAlphabet));
    }
}