require('babel-register');
const test = require('ava');
const Automata = require('../Automata/Automata').default;

let plain = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a'],
    rules: [
        {
            from: {name: 's'},
            to: {name: 'f'},
            symbol: 'a',
        },
        {
            from: {name: 'f'},
            to: {name: 'f'},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'}
};


test('automataProcessed', test => {
    let automata = new Automata(plain);
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
});
