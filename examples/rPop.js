const AO = require('../index');
const logger = require('./__logger');

var b = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};


var abaababORbabORc = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}, {name: 'q3'}, {name: 'q4'}, {name: 'q5'}, {name: 'q6'}, {name: 'q7'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q2'}},
            to: {state: {name: 'q3'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q3'}},
            to: {state: {name: 'q4'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q4'}},
            to: {state: {name: 'q5'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q5'}},
            to: {state: {name: 'q6'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q6'}},
            to: {state: {name: 'q7'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q5'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q7'}},
            symbol: 'c',
        },
    ],
    finalStates: [{name: 'q7'}],
    initialState: {name: 'q0'}
};

logger.automataLR(abaababORbabORc, '(abaabab)|(bab)|c');
logger.automataLR(b, 'b', false);

var automata = AO.operations.popsFA.rPop(new AO.automata.FA(abaababORbabORc), new AO.automata.FA(b));
logger.accepts(automata,'abaaba');
logger.accepts(automata,'ba');
console.log('---');
logger.accepts(automata,'abaabab');
logger.accepts(automata,'ab');
logger.accepts(automata,'c');
