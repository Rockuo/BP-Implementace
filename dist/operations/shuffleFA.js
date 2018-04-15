"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = shuffle;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _State = require("../Automata/State/State");

var _State2 = _interopRequireDefault(_State);

var _MergedState = require("../Automata/State/MergedState");

var _MergedState2 = _interopRequireDefault(_MergedState);

var _intersectionFA = require("./intersectionFA");

var _Rule = require("../Automata/Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _Automata = require("../Automata/Automata");

var _Automata2 = _interopRequireDefault(_Automata);

var _Alphabet = require("../Automata/Alphabet");

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _simple = require("../extensions/simple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// {
//     states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
//         alphabet: ['a', 'b'],
//     rules: [
//     {
//         from: {state: {name: 'q0'}},
//         to: {state: {name: 'q0'}},
//         symbol: 'b',
//     },
//     {
//         from: {state: {name: 'q0'}},
//         to: {state: {name: 'q1'}},
//         symbol: 'a',
//     },
//     {
//         from: {state: {name: 'q1'}},
//         to: {state: {name: 'q1'}},
//         symbol: 'b',
//     },
//     {
//         from: {state: {name: 'q1'}},
//         to: {state: {name: 'q2'}},
//         symbol: 'a',
//     }
// ],
//     finalStates: [{name: 'q1'}],
//     initialState: {name: 'q0'}
// };

/**
 *
 * @param  left
 * @param  right
 */
function shuffle(left, right) {
    var rules = [];

    var _generateStates = (0, _intersectionFA.generateStates)(left.states, right.states),
        newStates = _generateStates.newStates,
        newFinals = _generateStates.newFinals,
        newInitial = _generateStates.newInitial;

    var automata = new _FA2.default();
    automata.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat([].concat(_toConsumableArray(left.alphabet), _toConsumableArray(right.alphabet)))))();
    // $FlowFixMe
    automata.states = newStates;
    // $FlowFixMe
    automata.finalStates = newFinals;
    // $FlowFixMe
    automata.initialState = newInitial;
    automata.rules = createRules(left, right, newStates);
    return automata;
}

function createRules(left, right, newStates) {
    var newRules = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var newState = _step.value;

            var leftRules = left.rules.filter(function (rule) {
                return rule.from.state.name === newState.oldLeft.name;
            });
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = leftRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var rule = _step2.value;

                    newRules.push(new _Rule2.default({
                        from: { state: newState },
                        symbol: rule.symbol,
                        to: { state: newStates[_MergedState2.default.createName(rule.to.state, newState.oldRight)] }
                    }));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var rightRules = right.rules.filter(function (rule) {
                return rule.from.state.name === newState.oldRight.name;
            });
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = rightRules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _rule = _step3.value;

                    newRules.push(new _Rule2.default({
                        from: { state: newState },
                        symbol: _rule.symbol,
                        to: { state: newStates[_MergedState2.default.createName(newState.oldLeft, _rule.to.state)] }
                    }));
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        };

        for (var _iterator = (0, _simple.objectTypedValues)(newStates, _MergedState2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
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

    return newRules;
}