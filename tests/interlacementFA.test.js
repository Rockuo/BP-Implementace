const runTest = require('ava');
const FA = require('../dist/Automata/FA/FA').default;
const interlacement = require("../dist/operations/interlacementFA").default;


let b_aS_bb_S_S = {
    states: [{name:'q0'},{name:'q1'},{name:'q2'}],
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

let abS = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};





runTest('complex', test => {
    let automata = interlacement(new FA(b_aS_bb_S_S),new FA(abS));
    test.true(automata.accepts('ba'));
    test.true(automata.accepts('babbbb'));
    test.true(automata.accepts('baabab'));
    test.true(automata.accepts('baabbbbb'));
});
