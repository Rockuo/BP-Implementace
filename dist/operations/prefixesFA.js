'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prefixes;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _plainAutomata = require('../Automata/services/plainAutomata');

var _simple = require('../extensions/simple');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixes(automata) {
    var resAutomata = new _FA2.default((0, _plainAutomata.toPlain)(automata));
    resAutomata.removeUselessStatesAndRules();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _simple.objectTypedValues)(resAutomata.states)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var state = _step.value;

            state.setAsFinal();
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

    resAutomata.finalStates = resAutomata.states;
    return resAutomata;
}