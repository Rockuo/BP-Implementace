
require('babel-register');
const runTest = require('ava');
const FA = require('../Automata/FA').default;
const concatenation = require("../operations/concatenationFA").default;


let simple1 = {
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

let simple2 = {
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


runTest('simple', test => {
    let automata = concatenation(new FA(simple1), new FA(simple2));
    test.true(automata.accepts('aacd'));
    test.true(automata.accepts('bbcd'));

    automata = concatenation(new FA(simple2), new FA(simple1));
    test.true(automata.accepts('cdaa'));
    test.true(automata.accepts('cdbb'));


});
