'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = complement;

var _FA = require('../Automata/FA/FA');

var _FA2 = _interopRequireDefault(_FA);

var _plainFA = require('../Automata/services/plainFA');

var _object = require('../Automata/services/object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doplněk Konečného automatu
 * @param automata
 * @return {FA}
 */
function complement(automata) {
    var resAutomata = new _FA2.default((0, _plainFA.toPlain)(automata));

    // Odstraníme prázdné přechody, nedostupné stavy a zavedeme jeden globální uklízecí stav
    resAutomata.removeEmptyRules();
    resAutomata.removeUnreachableStates();
    resAutomata.ensureOneTrapState();

    // Otočíme koncové stavy za nekoncové
    resAutomata.finalStates = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _object.objectValues)(resAutomata.states)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var state = _step.value;

            state.isFinal = !state.isFinal;
            if (state.isFinal) {
                resAutomata.finalStates[state.name] = state;
            }
        }
        // voila
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

    return resAutomata;
}