const runTest = require('ava');
const FA = require('../dist/Automata/FA/FA').default;
const shuffle = require("../dist/operations/shuffleFA").default;


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


runTest('shuffle', test => {
    let automata = shuffle(new FA(simple1), new FA(simple2));
    test.true(automata.accepts('cdabb'));
    test.true(automata.accepts('cadbb'));
    test.true(automata.accepts('cabdb'));
    test.true(automata.accepts('cabbd'));
    test.true(automata.accepts('acdbb'));
    test.true(automata.accepts('acbdb'));
    test.true(automata.accepts('acbdb'));
    test.true(automata.accepts('abcdb'));
    test.true(automata.accepts('abcbd'));
    test.true(automata.accepts('abbcd'));

    test.false(automata.accepts('abdcd'));
    test.false(automata.accepts('cdbab'));
    test.false(automata.accepts('abcd'));

});
