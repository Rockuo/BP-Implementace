'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = intersection;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _plainAutomata = require('../Automata/services/plainAutomata');

var _intersectionFA = require('./intersectionFA');

var _Alphabet = require('../Automata/Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _MergedState = require('../Automata/State/MergedState');

var _MergedState2 = _interopRequireDefault(_MergedState);

var _Rule = require('../Automata/Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _simple = require('../extensions/simple');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function intersection(left, right) {
    right = new _FA2.default((0, _plainAutomata.toPlain)(right));
    right.forceOneFinalState();

    var _generateStates = (0, _intersectionFA.generateStates)(left.states, right.states),
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
    newAutomata.rules = createRules(left, right, newStates);

    return newAutomata;
}

function createRules(left, right, newStates) {
    var newRules = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var mergedState = _step.value;


            if (mergedState.oldRight.isFinal || mergedState.oldRight.isInitial) {
                newRules = left.rules.filter(function (rule) {
                    return rule.from.state.name === mergedState.oldLeft.name;
                }).map(function (rule) {
                    return new _Rule2.default({
                        from: { state: mergedState },
                        to: { state: newStates[_MergedState2.default.createName(rule.to.state, mergedState.oldRight)] },
                        symbol: rule.symbol
                    });
                }).concat(newRules);
            }

            if (!mergedState.oldRight.isFinal) {
                newRules = right.rules.filter(function (rule) {
                    return rule.from.state.name === mergedState.oldRight.name;
                }).map(function (rule) {
                    return new _Rule2.default({
                        from: { state: mergedState },
                        to: { state: newStates[_MergedState2.default.createName(mergedState.oldLeft, rule.to.state)] },
                        symbol: rule.symbol
                    });
                }).concat(newRules);
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