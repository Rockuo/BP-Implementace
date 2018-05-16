const AO = require('../index');
const logger = require('./__logger');


var plain1 = {
    states: [{name: 'q0'}, {name: 'q1'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q0'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q1'}},
            symbol: 'c',
        },
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};

logger.automata(plain1, 'b*ac*');
console.log('Mazaná abeceda: [\'c\']');

var automata = AO.operations.fullAlphabetDeletionFA(new AO.automata.FA(plain1), new AO.automata.Alphabet(...['c']));
logger.accepts(automata, 'ba');
logger.accepts(automata, 'bbbba');
logger.accepts(automata, 'a');
console.log('----');
logger.accepts(automata, 'b');
logger.accepts(automata, 'bac');

