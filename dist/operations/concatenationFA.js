"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = concatenation;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _plainFA_OR_PA = require("../Automata/services/plainFA_OR_PA");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// TODO
function concatenation(left, right) {
    var plainLeft = (0, _plainFA_OR_PA.toPlainLeft)(left),
        plainRight = (0, _plainFA_OR_PA.toPlainRight)(right);
    var rules = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = plainLeft.finalStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var finalState = _step.value;

            rules.push({
                from: { state: { name: finalState.name } },
                to: { state: plainRight.initialState },
                symbol: ''
            });
        }
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

    var plainConcatenation = {
        states: [].concat(_toConsumableArray(plainLeft.states), _toConsumableArray(plainRight.states)),
        alphabet: [].concat(_toConsumableArray(plainLeft.alphabet), _toConsumableArray(plainRight.alphabet)),
        rules: [].concat(rules, _toConsumableArray(plainLeft.rules), _toConsumableArray(plainRight.rules)),
        finalStates: plainRight.finalStates,
        initialState: plainLeft.initialState
    };

    return new _FA2.default(plainConcatenation);
}