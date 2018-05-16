const AO = require('../index');
const logger = require('./__logger');


var b_aS_bb_S_S = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
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
            to: {state: {name: 'q1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};

logger.automataLR(b_aS_bb_S_S, 'b(a*(bb)*)*');

var abS = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'e',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n1'}},
            symbol: 'f',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

logger.automataLR(b_aS_bb_S_S, 'ef*', false);

var automata = AO.operations.interlacementFA(new AO.automata.FA(b_aS_bb_S_S), new AO.automata.FA(abS));
logger.accepts(automata,'be');
logger.accepts(automata,'beafbfbf');
logger.accepts(automata,'beafafbfbfaf');
console.log('----');
logger.accepts(automata,'beafbfbfbf');
logger.accepts(automata,'beabbbb');
