const AO = require('../index');
const logger = require('./__logger');

var simple1 = {
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}, {name: 'n3'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'n2'}},
            to: {state: {name: 'n3'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n3'}],
    initialState: {name: 'n0'}
};

logger.automata(simple1, 'abb');

var automata = AO.operations.complementFA(new AO.automata.FA(simple1));
logger.accepts(automata, '');
logger.accepts(automata, 'a');
logger.accepts(automata, 'b');
logger.accepts(automata, 'abbb');
logger.accepts(automata, 'ba');
logger.accepts(automata, 'abab');
logger.accepts(automata, 'baba');
logger.accepts(automata, 'aab');
logger.accepts(automata, 'baa');
logger.accepts(automata, 'aaa');
logger.accepts(automata, 'bbb');
logger.accepts(automata, 'a');
logger.accepts(automata, 'b');
console.log('----');
logger.accepts(automata, 'abb');
