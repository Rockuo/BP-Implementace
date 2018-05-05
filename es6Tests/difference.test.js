require('babel-register');
const runTest = require('ava');
const DFA = require("../src/Automata/FA/DFA").default;
const FA = require('../src/Automata/FA/FA').default;
const difference = require("../src/operations/differenceFA").default;


let aORb = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};


let aPLUS = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

let aSTAR = {
    states: [{name: 'n0'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n0'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n0'}],
    initialState: {name: 'n0'}
};

runTest('aORb - aPLUS', test => {
    let automata = difference(new FA(aORb), new FA(aPLUS));
    test.true(automata.accepts('b'));

    test.false(automata.accepts(''));
    test.false(automata.accepts('a'));
    test.false(automata.accepts('aa'));
    test.false(automata.accepts('aaa'));
    test.false(automata.accepts('bb'));
    test.false(automata.accepts('bbb'));
});

runTest('aPLUS - aORb', test => {
    let automata = difference(new FA(aPLUS),new FA(aORb));
    test.true(automata.accepts('aa'));
    test.true(automata.accepts('aaa'));
    test.true(automata.accepts('aaaa'));
    test.true(automata.accepts('aaaaa'));


    test.false(automata.accepts(''));
    test.false(automata.accepts('a'));
    test.false(automata.accepts('b'));
});

runTest('aSTAR - aPLUS', test => {
    let automata = difference(new FA(aSTAR),new FA(aPLUS));
    test.true(automata.accepts(''));

    test.false(automata.accepts('a'));
    test.false(automata.accepts('aaa'));
    test.false(automata.accepts('aaaa'));
    test.false(automata.accepts('aaaaa'));
});

runTest('aSTAR - aORb', test => {
    let automata = difference(new FA(aSTAR),new FA(aORb));
    test.true(automata.accepts(''));
    test.true(automata.accepts('aa'));
    test.true(automata.accepts('aaa'));
    test.true(automata.accepts('aaaa'));
    test.true(automata.accepts('aaaaa'));

    test.false(automata.accepts('a'));
    test.false(automata.accepts('b'));
});


runTest('aPLUS - aSTAR', test => {
    let automata = difference(new FA(aPLUS),new FA(aSTAR));
    automata = DFA.covertFromFA(automata);
    test.is(Object.keys(automata.states).length, 1);
    test.is(Object.keys(automata.finalStates).length, 0);
});

