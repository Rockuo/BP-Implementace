const runTest = require('ava');
const FA = require('../dist/Automata/FA/FA').default;
const pop = require("../dist/operations/popFA");

let b = {
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
let a = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

let abaababORbabORc = {
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


runTest('simple lpop', test => {
    let automata = pop.lPop(new FA(abaababORbabORc),new FA(a));
    test.true(automata.accepts('baabab'));
    test.false(automata.accepts('bab'));
    test.false(automata.accepts('abaabab'));
    test.false(automata.accepts('ab'));
    test.false(automata.accepts('c'));
});

runTest('simple rpop', test => {
    let automata = pop.rPop(new FA(abaababORbabORc),new FA(b));
    test.true(automata.accepts('abaaba'));
    test.true(automata.accepts('ba'));
    test.false(automata.accepts('abaabab'));
    test.false(automata.accepts('ab'));
    test.false(automata.accepts('c'));
});
