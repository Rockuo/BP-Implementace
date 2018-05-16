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

/**
 * Průnik Konečného automatu
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
function intersectionFA(left, right) {
    left = left.clone();
    right = right.clone();
    //odstraníme prázdné přechody aabychom na ně nemuseli brát ohled
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

/**
 * Zkombinuje stavy levého a pravého automatu L X Y (karézský součin)
 * @param lStates
 * @param rStates
 * @return {{newStates, newFinals, newInitial: *, statesByLeft, statesByRight}}
 */
function generateStates(lStates, rStates) {
    var newStates = {},
        newFinals = {},
        newInitial = void 0,
        statesByLeft = {},
        statesByRight = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _object.objectValues)(lStates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var lState = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _object.objectValues)(rStates)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var rState = _step2.value;

                    var merged = new _MergedState2.default(lState, rState);

                    newStates[merged.name] = merged;

                    if (merged.isFinal) newFinals[merged.name] = merged;
                    if (merged.isInitial) newInitial = merged;
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

    return { newStates: newStates, newFinals: newFinals, newInitial: newInitial, statesByLeft: statesByLeft, statesByRight: statesByRight };
}

/**
 * VYgeneruje pravidla pro průnik
 * @param left
 * @param right
 * @param newStates
 * @return {Array}
 */
function generateRules(left, right, newStates) {
    var lRules = left.rules,
        rRules = right.rules;

    var newRules = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        var _loop = function _loop() {
            var mergedState = _step3.value;

            // filtr na přechody levého automatu
            var filteredLRules = lRules.filter(function (rule) {
                return rule.from.state.equals(mergedState.oldLeft);
            });
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var lRule = _step4.value;

                    // filtr na přechody pravého automatu
                    var filteredRRules = rRules.filter(function (rule) {
                        return rule.from.state.equals(mergedState.oldRight) && rule.symbol === lRule.symbol;
                    });
                    // použijeme kombinace pravidel
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = filteredRRules[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var rRule = _step5.value;

                            newRules.push(new _Rule2.default({
                                from: { state: mergedState },
                                symbol: rRule.symbol,
                                to: { state: newStates[_MergedState2.default.createName(lRule.to.state, rRule.to.state)] }
                            }));
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }
                };

                for (var _iterator4 = filteredLRules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        };

        for (var _iterator3 = (0, _object.objectValues)(newStates)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop();
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

    return newRules;
}