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
logger.automataLR(simple1, '(aa)|(bb)');
logger.automataLR(simple2, 'cd', false);

var automata = AO.operations.shuffleFA(new AO.automata.FA(simple1), new AO.automata.FA(simple2));
logger.accepts(automata,'cdabb');
logger.accepts(automata,'cadbb');
logger.accepts(automata,'cabdb');
logger.accepts(automata,'cabbd');
logger.accepts(automata,'acdbb');
logger.accepts(automata,'acbdb');
logger.accepts(automata,'acbdb');
logger.accepts(automata,'abcdb');
logger.accepts(automata,'abcbd');
logger.accepts(automata,'abbcd');
console.log('----');
logger.accepts(automata,'abdcd');
logger.accepts(automata,'cdbab');
logger.accepts(automata,'abcd');
