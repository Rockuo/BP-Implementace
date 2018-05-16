const AO = require('../index');
const logger = require('./__logger');

var simple1 = {
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}, {name: 'n3'}, {name: 'n4'}],
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
            symbol: 'a',
        },
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n3'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'n3'}},
            to: {state: {name: 'n4'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n2'}, {name: 'n4'}],
    initialState: {name: 'n0'}
};

logger.automataLR(simple1, '(aa)|(bb)');

var simple2 = {
    states: [{name: 'l0'}, {name: 'l1'}, {name: 'l2'}],
    alphabet: ['c', 'd'],
    rules: [
        {
            from: {state: {name: 'l0'}},
            to: {state: {name: 'l1'}},
            symbol: 'c',
        },
        {
            from: {state: {name: 'l1'}},
            to: {state: {name: 'l2'}},
            symbol: 'd',
        },
    ],
    finalStates: [{name: 'l2'}],
    initialState: {name: 'l0'}
};

logger.automataLR(simple2, 'cd', false);

var automata = AO.operations.parallelInsertionFA(new AO.automata.FA(simple2), new AO.automata.FA(simple1));
logger.accepts(automata,'aacaadaa');
logger.accepts(automata,'aacaadbb');
logger.accepts(automata,'aacbbdaa');
logger.accepts(automata,'aacbbdbb');
logger.accepts(automata,'bbcaadaa');
logger.accepts(automata,'bbcaadbb');
logger.accepts(automata,'bbcbbdaa');
logger.accepts(automata,'bbcbbdbb');
console.log('----');
logger.accepts(automata,'aaacadaa');
logger.accepts(automata,'aacadabb');
logger.accepts(automata,'aabbdaa');
logger.accepts(automata,'aacbbbb');
logger.accepts(automata,'bcbaadaa');
