const AO = require('../index');
const logger = require('./__logger');

var plain1 = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
    alphabet: ['a', 'b'],
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
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};

logger.automata(plain1, 'b*ab*');

var automata = AO.operations.prefixesFA(new AO.automata.FA(plain1));
logger.accepts(automata,'bab');
logger.accepts(automata,'bbabb');
logger.accepts(automata,'b');
logger.accepts(automata,'bb');
logger.accepts(automata,'ba');
logger.accepts(automata,'bba');
console.log('----');
logger.accepts(automata,'bbaa');
