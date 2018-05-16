"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sequentialDeletion;
exports.specialRulesToResultAutomata = specialRulesToResultAutomata;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Operace sekvenčního mazání
 * @param {FA} left
 * @param {FA} right
 * @param {string} specialSymbol
 * @return FA
 */
function sequentialDeletion(left, right) {
    var specialSymbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';

    //naklonujeme automaty, abychom nezasahovali do původních
    left = left.clone();
    right = right.clone();
    //odstraníme epsilon přechody
    left.removeEmptyRules();
    right.removeEmptyRules();
    //sjednotíme abecedy
    left.alphabet = right.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(right.alphabet), _toConsumableArray(left.alphabet), [specialSymbol])))();

    // vytvoříme kopii levého automatu (jako wprapper pro L_q,q')
    var copyLeft = left.clone();
    // tato kopie
    copyLeft.initialState.isInitial = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _object.objectValues)(copyLeft.finalStates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var state = _step.value;

            state.isFinal = false;
        }

        //převedeme stavy do pole
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

    var copyLeftStates = (0, _object.objectValues)(copyLeft.states);

    //pro všechny kombinace q a q' jako počáteční a koncový stav si přidáme # přechody do levého automatu
    // (levý automat se tak rovnou stává i automatem v teorii jako M')
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = copyLeftStates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var newInitialState = _step2.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = copyLeftStates[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var newFinalState = _step3.value;

                    //nastavíme procházené stavy jako poáteční a koncový
                    copyLeft.initialState = newInitialState;
                    newInitialState.isInitial = true;
                    copyLeft.finalStates = _defineProperty({}, newFinalState.name, newFinalState);
                    newFinalState.isFinal = true;

                    //naklonujeme takto upravený levý automat a zbavíme se nepotřebných stavů
                    var partLeft = copyLeft.clone();
                    partLeft.removeUnreachableStates();

                    //pokud nový počáteční a koncový stav propojeny
                    if (Object.keys(partLeft.finalStates).length > 0) {
                        //zbavíme se dalších nepotřebných stavů
                        partLeft.removeTrapStates();

                        //provedeme průnik s pravým automatem a zbavíme se nepotřebných stavů
                        var intersection = (0, _intersectionFA2.default)(partLeft, right);
                        intersection.removeUnreachableStates();
                        // pokud stále existuje cesta mezi q a q', vytvoříme mezi nima # přechod
                        if (Object.keys(intersection.finalStates).length > 0) {
                            left.rules.push(new _Rule2.default({
                                from: { state: left.states[newInitialState.name] },
                                to: { state: left.states[newFinalState.name] },
                                symbol: specialSymbol
                            }));
                        }
                    }

                    //uklidíme po práci cyklu
                    newFinalState.isFinal = false;
                    newInitialState.isInitial = false;
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

    return specialRulesToResultAutomata(left, right, specialSymbol);
};

/**
 * Převádí automat s # přechody na h(L(M') (průnik) Sigma*#Sigma*)
 * @param {FA} left (jako M')
 * @param {FA} right
 * @param {string} specialSymbol
 * @return FA
 */
function specialRulesToResultAutomata(left, right, specialSymbol) {
    var _sigmaIterSpecialSigm;

    //Vytovříme automat přijímající Sigma*#Sigma*
    var sigmaIterSpecialSigmaIter = new _FA2.default();

    //vytvoříme abecedu
    sigmaIterSpecialSigmaIter.alphabet = left.alphabet;

    //vytvoříme stavy
    var initState = new _State2.default({ name: 'start', isInitial: true });
    var finalState = new _State2.default({ name: 'end', isFinal: true });
    sigmaIterSpecialSigmaIter.states = (_sigmaIterSpecialSigm = {}, _defineProperty(_sigmaIterSpecialSigm, initState.name, initState), _defineProperty(_sigmaIterSpecialSigm, finalState.name, finalState), _sigmaIterSpecialSigm);
    initState.isInitial = true;
    sigmaIterSpecialSigmaIter.initialState = initState;
    finalState.isFinal = true;
    sigmaIterSpecialSigmaIter.finalStates = _defineProperty({}, finalState.name, finalState);

    // vytvoříme přechody
    sigmaIterSpecialSigmaIter.rules = [new _Rule2.default({
        from: { state: initState },
        to: { state: finalState },
        symbol: specialSymbol
    })];

    var _arr = [].concat(_toConsumableArray(left.alphabet), _toConsumableArray(right.alphabet));

    for (var _i = 0; _i < _arr.length; _i++) {
        var symbol = _arr[_i];
        sigmaIterSpecialSigmaIter.rules.push(new _Rule2.default({
            from: { state: initState },
            to: { state: initState },
            symbol: symbol
        }));
        sigmaIterSpecialSigmaIter.rules.push(new _Rule2.default({
            from: { state: finalState },
            to: { state: finalState },
            symbol: symbol
        }));
    }

    //provedeme průnik M' s Sigma*#Sigma* a nahradíme # za prázné přechody
    var intersection = (0, _intersectionFA2.default)(left, sigmaIterSpecialSigmaIter);
    var index = intersection.alphabet.indexOf(specialSymbol);
    if (index !== -1) intersection.alphabet.splice(index, 1);
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = intersection.rules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var rule = _step4.value;

            if (rule.symbol === specialSymbol) {
                rule.symbol = '';
            }
        }
        //odstraníme nepotřebné stavy
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

    intersection.removeTrapStates();
    intersection.removeUnreachableStates();

    return intersection;
}