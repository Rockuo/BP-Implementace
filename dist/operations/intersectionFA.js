'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = intersectionFA;
exports.generateStates = generateStates;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _State = require('../Automata/State/State');

var _State2 = _interopRequireDefault(_State);

var _Alphabet = require('../Automata/Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _MergedState = require('../Automata/State/MergedState');

var _MergedState2 = _interopRequireDefault(_MergedState);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Rule = require('../Automata/Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _object = require('../Automata/services/object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function intersectionFA(left, right) {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();

    var _generateStates = generateStates(left.states, right.states),
        newStates = _generateStates.newStates,
        newFinals = _generateStates.newFinals,
        newInitial = _generateStates.newInitial,
        newAutomata = new _FA2.default();
    // $FlowFixMe


    newAutomata.states = newStates;
    // $FlowFixMe
    newAutomata.finalStates = newFinals;
    // $FlowFixMe
    newAutomata.initialState = newInitial;
    newAutomata.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat([].concat(_toConsumableArray(left.alphabet), _toConsumableArray(right.alphabet)))))();
    newAutomata.rules = generateRules(left, right, newStates);
    return newAutomata;
}

function generateStates(lStates, rStates) {
    var newStates = {},
        newFinals = {},
        newInitial = void 0,
        statesByLeft = {},
        statesByRight = {};
    _lodash2.default.each(lStates, function (lState) {
        return _lodash2.default.each(rStates, function (rState) {
            var merged = new _MergedState2.default(lState, rState);

            newStates[merged.name] = merged;

            if (merged.isFinal) newFinals[merged.name] = merged;
            if (merged.isInitial) newInitial = merged;
        });
    });
    return { newStates: newStates, newFinals: newFinals, newInitial: newInitial, statesByLeft: statesByLeft, statesByRight: statesByRight };
}

function generateRules(left, right, newStates) {
    var lRules = left.rules,
        rRules = right.rules;

    var newRules = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var mergedState = _step.value;

            // console.log();
            var filteredLRules = lRules.filter(function (rule) {
                return rule.from.state.equals(mergedState.oldLeft);
            });
            // console.log();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var lRule = _step2.value;

                    // console.log();
                    var filteredRRules = rRules.filter(function (rule) {
                        return rule.from.state.equals(mergedState.oldRight) && rule.symbol === lRule.symbol;
                    });
                    // console.log();
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = filteredRRules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var rRule = _step3.value;

                            // console.log();
                            newRules.push(new _Rule2.default({
                                from: { state: mergedState },
                                symbol: rRule.symbol,
                                to: { state: newStates[_MergedState2.default.createName(lRule.to.state, rRule.to.state)] }
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

                for (var _iterator2 = filteredLRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop2();
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
        };

        for (var _iterator = (0, _object.objectValues)(newStates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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