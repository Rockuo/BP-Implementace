const runTest = require('ava');
const FA = require('../dist/Automata/FA/FA').default;
const sequentialDeletion = require("../dist/operations/sequentialDeletionFA").default;

let abaababORbab = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}, {name: 'q3'}, {name: 'q4'}, {name: 'q5'}, {name: 'q6'}, {name: 'q7'}],
    alphabet: ['a', 'b'],
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
    ],
    finalStates: [{name: 'q7'}],
    initialState: {name: 'q0'}
};

let ab = {
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}],
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
    ],
    finalStates: [{name: 'n2'}],
    initialState: {name: 'n0'}
};


runTest('simple', test => {
    let automata = sequentialDeletion(new FA(abaababORbab), new FA(ab));
    test.true(automata.accepts('b'));
    test.true(automata.accepts('aabab'));
    test.true(automata.accepts('abaab'));
    test.false(automata.accepts('ab'));
    test.false(automata.accepts('abaabab'));

});
