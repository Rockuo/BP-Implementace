require('babel-register');
const runTest = require('ava');
const FA = require('../src/Automata/FA/FA').default;
const complement = require("../src/operations/complementFA").default;


let simple1 = {
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



runTest('aaa', test => {
    let automata = complement(new FA(simple1));
    test.false(automata.accepts('abb'));

    test.true(automata.accepts(''));
    test.true(automata.accepts('a'));
    test.true(automata.accepts('b'));
    test.true(automata.accepts('abbb'));
    test.true(automata.accepts('ba'));
    test.true(automata.accepts('abab'));
    test.true(automata.accepts('baba'));
    test.true(automata.accepts('aab'));
    test.true(automata.accepts('baa'));
    test.true(automata.accepts('aaa'));
    test.true(automata.accepts('bbb'));
    test.true(automata.accepts('a'));
    test.true(automata.accepts('b'));
});
