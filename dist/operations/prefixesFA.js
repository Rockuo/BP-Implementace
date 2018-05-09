'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prefixes;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _object = require('../Automata/services/object');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generuhe automat přijímající prefixy zadaného automatu
 * @param {FA} automata
 * @return {FA}
 */
function prefixes(automata) {
    //vytvoříme nový automat ze starého
    var resAutomata = automata.clone();
    resAutomata.removeTrapStates(); //odstraníme uklízecí stavy

    //všechny stavy se stávají koncovými
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _object.objectValues)(resAutomata.states)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

    resAutomata.finalStates = _lodash2.default.clone(resAutomata.states);

    //pro úhlednost přidáme uklízecí stav
    resAutomata.ensureOneTrapState();

    return resAutomata;
}