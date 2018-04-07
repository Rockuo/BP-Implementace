
require('babel-register');
const runTest = require('ava');
const FA = require('../Automata/FA').default;
const intersectionFA = require("../operations/intersectionFA").default;

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

let plain2 = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q0'}},
            symbol: 'a',
        },
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
        }
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};


runTest('intesrsected', test => {
    let l_automata = new FA(plain1);
    let r_automata = new FA(plain2);
    let intersecred = intersectionFA(l_automata, r_automata);
    test.false(intersecred.accepts('a'));
    test.false(intersecred.accepts('b'));
    test.true(intersecred.accepts('ab'));
    test.true(intersecred.accepts('ba'));
    test.false(intersecred.accepts('aba'));
    test.false(intersecred.accepts('ban'));
});
