"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rPop = rPop;
exports.lPop = lPop;

var _FA = require("../Automata/FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _Alphabet = require("../Automata/Alphabet");

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _object = require("../Automata/services/object");

var _State = require("../Automata/State/State");

var _State2 = _interopRequireDefault(_State);

var _Rule = require("../Automata/Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _intersectionFA = require("./intersectionFA");

var _intersectionFA2 = _interopRequireDefault(_intersectionFA);

var _plainFA = require("../Automata/services/plainFA");

var _sequentialDeletionFA = require("./sequentialDeletionFA");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function rPop(left, right) {
    var specialSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';

    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    left.alphabet = right.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(right.alphabet), _toConsumableArray(left.alphabet), [specialSymbol])))();

    var copyLeft = left.clone();
    copyLeft.initialState.isInitial = false;

    var copyLeftStates = (0, _object.objectValues)(copyLeft.states);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = copyLeftStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var newInitialState = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _object.objectValues)(copyLeft.finalStates)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var finalState = _step2.value;

                    copyLeft.initialState = newInitialState;
                    newInitialState.isInitial = true;

                    var partLeft = copyLeft.clone();
                    partLeft.removeUnreachableStates();
                    if (Object.keys(partLeft.finalStates).length > 0) {
                        partLeft.removeTrapStates();
                        var intersection = (0, _intersectionFA2.default)(partLeft, right);
                        intersection.removeUnreachableStates();
                        if (Object.keys(intersection.finalStates).length > 0) {
                            left.rules.push(new _Rule2.default({
                                from: { state: left.states[newInitialState.name] },
                                to: { state: left.states[finalState.name] },
                                symbol: specialSymbol
                            }));
                        }
                    }
                    newInitialState.isInitial = false;
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

    return (0, _sequentialDeletionFA.specialRulesToResultAutomata)(left, right, specialSymbol);
}

function lPop(left, right) {
    var specialSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';

    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    left.alphabet = right.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(right.alphabet), _toConsumableArray(left.alphabet), [specialSymbol])))();

    var copyLeft = left.clone();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = (0, _object.objectValues)(copyLeft.finalStates)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var state = _step3.value;

            state.isFinal = false;
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

    var copyLeftStates = (0, _object.objectValues)(copyLeft.states);
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = copyLeftStates[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var newFinalState = _step4.value;

            copyLeft.finalStates = _defineProperty({}, newFinalState.name, newFinalState);
            newFinalState.isFinal = true;
            var partLeft = copyLeft.clone();
            partLeft.removeUnreachableStates();
            if (Object.keys(partLeft.finalStates).length > 0) {
                partLeft.removeTrapStates();
                var intersection = (0, _intersectionFA2.default)(partLeft, right);
                intersection.removeUnreachableStates();
                if (Object.keys(intersection.finalStates).length > 0) {
                    left.rules.push(new _Rule2.default({
                        from: { state: left.states[copyLeft.initialState.name] },
                        to: { state: left.states[newFinalState.name] },
                        symbol: specialSymbol
                    }));
                }
            }
            newFinalState.isFinal = false;
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

    return (0, _sequentialDeletionFA.specialRulesToResultAutomata)(left, right, specialSymbol);
}