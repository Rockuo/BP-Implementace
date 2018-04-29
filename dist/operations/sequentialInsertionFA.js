'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sequentialInserion;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _plainFA = require('../Automata/services/plainFA');

var _intersectionFA = require('./intersectionFA');

var _Alphabet = require('../Automata/Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _MergedState = require('../Automata/State/MergedState');

var _MergedState2 = _interopRequireDefault(_MergedState);

var _Rule = require('../Automata/Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _object = require('../Automata/services/object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Sekvenční vkládání
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
function sequentialInserion(left, right) {
    //budeme upravovat left a right a nechceme měnit vstupní automaty
    left = left.clone();
    right = right.clone();
    // nechceme přemýšlet nad prázdnými stavy => odstraníme je
    left.removeEmptyRules();
    right.removeEmptyRules();

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