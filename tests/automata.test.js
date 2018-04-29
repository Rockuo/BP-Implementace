const runTest = require('ava');
const FA = require('../dist/Automata/FA/FA').default;
const PA = require('../dist/Automata/PA/PA').default;
const toPlain = require('../dist/Automata/services/plainFA_OR_PA').toPlain;

let plain = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 's'},},
            to: {state: {name: 'f'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}},
            to: {state: {name: 'f'}},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'}
};


let plainPA = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 's'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: 'Sa'},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'a'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'},
    initialStackSymbol: 'S',
    stackAlphabet: ['a', 'S']
};


runTest('automataProcessed', test => {
    let automata = new FA(plain);
    test.is(Object.keys(automata.states).length, 2);
    test.true(automata.states['s'].isInitial);
    test.false(automata.states['s'].isFinal);
    test.true(automata.states['f'].isFinal);
    test.false(automata.states['f'].isInitial);

    test.is(automata.alphabet.length, 1);
    test.is(automata.alphabet[0], 'a');

    test.is(Object.keys(automata.finalStates).length, 1);
    test.true(!!automata.finalStates['f']);

    test.is(automata.initialState.name, 's');

    test.is(automata.rules.length, 2);

    test.is(automata.rules[0].from.state.name, 's');
    test.is(automata.rules[0].to.state.name, 'f');
    test.is(automata.rules[1].from.state.name, 'f');
    test.is(automata.rules[1].to.state.name, 'f');
});


runTest('automataCloned', test => {
    let automata = new FA(toPlain(new FA(plain), '_'));

    test.is(Object.keys(automata.states).length, 2);
    test.true(automata.states['_s'].isInitial);
    test.false(automata.states['_s'].isFinal);
    test.true(automata.states['_f'].isFinal);
    test.false(automata.states['_f'].isInitial);

    test.is(automata.alphabet.length, 1);
    test.is(automata.alphabet[0], 'a');

    test.is(Object.keys(automata.finalStates).length, 1);
    test.true(!!automata.finalStates['_f']);

    test.is(automata.initialState.name, '_s');

    test.is(automata.rules.length, 2);
    test.is(automata.rules[0].from.state.name, '_s');
    test.is(automata.rules[0].to.state.name, '_f');
    test.is(automata.rules[1].from.state.name, '_f');
    test.is(automata.rules[1].to.state.name, '_f');
});

runTest('pushdownAutomata', test => {
    let automata = new PA(plainPA);

    test.is(Object.keys(automata.states).length, 2);
    test.true(automata.states['s'].isInitial);
    test.false(automata.states['s'].isFinal);
    test.true(automata.states['f'].isFinal);
    test.false(automata.states['f'].isInitial);

    test.is(automata.alphabet.length, 1);
    test.is(automata.alphabet[0], 'a');

    test.is(Object.keys(automata.finalStates).length, 1);
    test.true(!!automata.finalStates['f']);

    test.is(automata.initialState.name, 's');

    test.is(automata.rules.length, 3);
    test.is(automata.rules[0].from.state.name, 's');
    test.is(automata.rules[0].from.stackTop, 'S');
    test.is(automata.rules[0].to.state.name, 'f');
    test.is(automata.rules[0].to.stackTop, 'Sa');
    test.is(automata.rules[1].from.state.name, 'f');
    test.is(automata.rules[1].from.stackTop, 'a');
    test.is(automata.rules[1].to.state.name, 'f');
    test.is(automata.rules[1].to.stackTop, '');
    test.is(automata.rules[2].from.state.name, 'f');
    test.is(automata.rules[2].from.stackTop, 'S');
    test.is(automata.rules[2].to.state.name, 'f');
    test.is(automata.rules[2].to.stackTop, '');

    test.is(automata.initialStackSymbol, 'S');
    test.deepEqual(automata.stackAlphabet, ['a', 'S']);
});


runTest('pushdownAutomataCloned', test => {
    let automata = new PA(toPlain(new PA(plainPA), '_'));

    test.is(Object.keys(automata.states).length, 2);
    test.true(automata.states['_s'].isInitial);
    test.false(automata.states['_s'].isFinal);
    test.true(automata.states['_f'].isFinal);
    test.false(automata.states['_f'].isInitial);

    test.is(automata.alphabet.length, 1);
    test.is(automata.alphabet[0], 'a');

    test.is(Object.keys(automata.finalStates).length, 1);
    test.true(!!automata.finalStates['_f']);

    test.is(automata.initialState.name, '_s');

    test.is(automata.rules.length, 3);

    test.is(automata.rules[0].from.state.name, '_s');
    test.is(automata.rules[0].from.stackTop, 'S');
    test.is(automata.rules[0].to.state.name, '_f');
    test.is(automata.rules[0].to.stackTop, 'Sa');
    test.is(automata.rules[1].from.state.name, '_f');
    test.is(automata.rules[1].from.stackTop, 'a');
    test.is(automata.rules[1].to.state.name, '_f');
    test.is(automata.rules[1].to.stackTop, '');
    test.is(automata.rules[2].from.state.name, '_f');
    test.is(automata.rules[2].from.stackTop, 'S');
    test.is(automata.rules[2].to.state.name, '_f');
    test.is(automata.rules[2].to.stackTop, '');

    test.is(automata.initialStackSymbol, 'S');
    test.deepEqual(automata.stackAlphabet, ['a', 'S']);
});
