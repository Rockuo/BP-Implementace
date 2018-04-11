
require('babel-register');
const runTest = require('ava');
const FA = require('../Automata/FA').default;
const prefixes = require("../operations/prefixesFA").default;

let plain1 = {
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



runTest('prefixes', test => {
    let automata = prefixes(new FA(plain1));
    test.true(automata.accepts('bab'));
    test.true(automata.accepts('bbabb'));
    test.true(automata.accepts('b'));
    test.true(automata.accepts('bb'));
    test.true(automata.accepts('ba'));
    test.true(automata.accepts('bba'));
    test.false(automata.accepts('bbaa'))
});
