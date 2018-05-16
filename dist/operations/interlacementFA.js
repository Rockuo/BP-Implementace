"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = interlacement;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _MergedState = require("../Automata/State/MergedState");

var _MergedState2 = _interopRequireDefault(_MergedState);

var _intersectionFA = require("./intersectionFA");

var _Rule = require("../Automata/Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _Alphabet = require("../Automata/Alphabet");

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _object = require("../Automata/services/object");

var _State = require("../Automata/State/State");

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ZERO_PREFIX = '_0_';
var ONE_PREFIX = '_1_';

/**
 * Propletení automatů
 * @param  left
 * @param  right
 */
function interlacement(left, right) {
    var _decStates;

    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    var rules = [];
    /** Přidá stavy {0,1}*/
    var decStates = (_decStates = {}, _defineProperty(_decStates, ZERO_PREFIX, new _State2.default({ name: ZERO_PREFIX, isInitial: true, isFinal: true })), _defineProperty(_decStates, ONE_PREFIX, new _State2.default({ name: ONE_PREFIX })), _decStates);
    /// {0,1}X stavy levého X stavy pravého

    var _generateStates = (0, _intersectionFA.generateStates)(decStates, (0, _intersectionFA.generateStates)(left.states, right.states).newStates),
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

/**
 * Vytvoří pravidla pro inerlacement
 * @param {FA} left
 * @param {FA} right
 * @param {{}}newStates
 * @return {Array}
 */
function createRules(left, right, newStates) {
    var newRules = [];
    //pro všechny mergnuté stavy ({0,1} X L X R)
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var newState = _step.value;

            // pokud je v 0 používáme praidla levého stavu
            if (newState.oldLeft.name === ZERO_PREFIX) {
                var leftRules = left.rules.filter(function (rule) {
                    return rule.from.state.equals(newState.oldRight.oldLeft);
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
                            to: {
                                state: newStates[_MergedState2.default.createName(ONE_PREFIX, _MergedState2.default.createName(rule.to.state, newState.oldRight.oldRight))]
                            }
                        }));
                    }
                    // pokud je v 1 používáme praidla pravého stavu
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
            } else {
                var rightRules = right.rules.filter(function (rule) {
                    return rule.from.state.equals(newState.oldRight.oldRight);
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
                            to: {
                                state: newStates[_MergedState2.default.createName(ZERO_PREFIX, _MergedState2.default.createName(newState.oldRight.oldLeft, _rule.to.state))]
                            }
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