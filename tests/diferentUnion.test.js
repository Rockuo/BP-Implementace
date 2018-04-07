require('babel-register');
const runTest = require('ava');
const Automata = require('../Automata/Automata').default;
const PA = require('../Automata/PA').default;
const differentUnion = require('../operations/differentUnion').default;
const State = require("../Automata/State").default;


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
let plainB = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['b'],
    rules: [
        {
            from: {state: {name: 's'},},
            to: {state: {name: 'f'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}},
            to: {state: {name: 'f'}},
            symbol: 'b',
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
let plainPB = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['b'],
    rules: [
        {
            from: {state: {name: 's'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: 'Sa'},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'a'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'b',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'},
    initialStackSymbol: 'S',
    stackAlphabet: ['b', 'S']
};

runTest('unionAutomata', test => {
    let l_automata = new Automata(plain), r_automata = new Automata(plain);

    let unionAutomata = differentUnion(l_automata, r_automata);
    test.is(!!unionAutomata, false);

    r_automata = new Automata(plainB);
    unionAutomata = differentUnion(l_automata, r_automata);
    test.is(Object.keys(unionAutomata.states).length, 6);
    test.true(unionAutomata.states['s'].isInitial);
    test.false(unionAutomata.states['s'].isFinal);
    test.true(unionAutomata.states['f'].isFinal);
    test.false(unionAutomata.states['f'].isInitial);

    test.true(unionAutomata.states['l_s'] instanceof State);
    test.true(unionAutomata.states['l_f'] instanceof State);
    test.true(unionAutomata.states['r_s'] instanceof State);
    test.true(unionAutomata.states['r_f'] instanceof State);

    test.is(unionAutomata.alphabet.length, 2);
    test.is(unionAutomata.alphabet[0], 'a');
    test.is(unionAutomata.alphabet[1], 'b');

    test.is(Object.keys(unionAutomata.finalStates).length, 1);
    test.true(!!unionAutomata.finalStates['f']);

    test.is(unionAutomata.initialState.name, 's');

    test.is(unionAutomata.rules.length, 8);
    test.is(unionAutomata.rules[0].from.state.name, 's');
    test.is(unionAutomata.rules[0].to.state.name, 'l_s');
    test.is(unionAutomata.rules[1].from.state.name, 's');
    test.is(unionAutomata.rules[1].to.state.name, 'r_s');
    test.is(unionAutomata.rules[2].from.state.name, 'l_f');
    test.is(unionAutomata.rules[2].to.state.name, 'f');
    test.is(unionAutomata.rules[3].from.state.name, 'r_f');
    test.is(unionAutomata.rules[3].to.state.name, 'f');
    test.is(unionAutomata.rules[4].from.state.name, 'l_s');
    test.is(unionAutomata.rules[4].to.state.name, 'l_f');
    test.is(unionAutomata.rules[5].from.state.name, 'l_f');
    test.is(unionAutomata.rules[5].to.state.name, 'l_f');
    test.is(unionAutomata.rules[6].from.state.name, 'r_s');
    test.is(unionAutomata.rules[6].to.state.name, 'r_f');
    test.is(unionAutomata.rules[7].from.state.name, 'r_f');
    test.is(unionAutomata.rules[7].to.state.name, 'r_f');
});


runTest('unionPA', test => {
    let l_automata = new PA(plainPA), r_automata = new PA(plainPA);


    let unionAutomata = differentUnion(l_automata, r_automata, PA);

    test.false(!!unionAutomata);

    r_automata = new PA(plainPB);
    unionAutomata = differentUnion(l_automata, r_automata, PA);


    test.is(Object.keys(unionAutomata.states).length, 6);
    test.true(unionAutomata.states['s'].isInitial);
    test.false(unionAutomata.states['s'].isFinal);
    test.true(unionAutomata.states['f'].isFinal);
    test.false(unionAutomata.states['f'].isInitial);

    test.true(unionAutomata.states['l_s'] instanceof State);
    test.true(unionAutomata.states['l_f'] instanceof State);
    test.true(unionAutomata.states['r_s'] instanceof State);
    test.true(unionAutomata.states['r_f'] instanceof State);

    test.is(unionAutomata.alphabet.length, 2);
    test.is(unionAutomata.alphabet[0], 'a');
    test.is(unionAutomata.alphabet[1], 'b');

    test.is(Object.keys(unionAutomata.finalStates).length, 1);
    test.true(!!unionAutomata.finalStates['f']);

    test.is(unionAutomata.initialState.name, 's');

    test.is(unionAutomata.rules.length, 10);
    test.is(unionAutomata.rules[0].from.state.name, 's');
    test.is(unionAutomata.rules[0].from.stackTop, '');
    test.is(unionAutomata.rules[0].to.state.name, 'l_s');
    test.is(unionAutomata.rules[0].to.stackTop, '');
    test.is(unionAutomata.rules[1].from.state.name, 's');
    test.is(unionAutomata.rules[1].from.stackTop, '');
    test.is(unionAutomata.rules[1].to.state.name, 'r_s');
    test.is(unionAutomata.rules[1].to.stackTop, '');

    test.is(unionAutomata.rules[2].from.state.name, 'l_f');
    test.is(unionAutomata.rules[2].from.stackTop, '');
    test.is(unionAutomata.rules[2].to.state.name, 'f');
    test.is(unionAutomata.rules[2].to.stackTop, '');
    test.is(unionAutomata.rules[3].from.state.name, 'r_f');
    test.is(unionAutomata.rules[3].from.stackTop, '');
    test.is(unionAutomata.rules[3].to.state.name, 'f');
    test.is(unionAutomata.rules[3].to.stackTop, '');

    test.is(unionAutomata.rules[4].from.state.name, 'l_s');
    test.is(unionAutomata.rules[4].from.stackTop, 'S');
    test.is(unionAutomata.rules[4].to.state.name, 'l_f');
    test.is(unionAutomata.rules[4].to.stackTop, 'Sa');
    test.is(unionAutomata.rules[5].from.state.name, 'l_f');
    test.is(unionAutomata.rules[5].from.stackTop, 'a');
    test.is(unionAutomata.rules[5].to.state.name, 'l_f');
    test.is(unionAutomata.rules[5].to.stackTop, '');
    test.is(unionAutomata.rules[6].from.state.name, 'l_f');
    test.is(unionAutomata.rules[6].from.stackTop, 'S');
    test.is(unionAutomata.rules[6].to.state.name, 'l_f');
    test.is(unionAutomata.rules[6].to.stackTop, '');

    test.is(unionAutomata.rules[7].from.state.name, 'r_s');
    test.is(unionAutomata.rules[7].from.stackTop, 'S');
    test.is(unionAutomata.rules[7].to.state.name, 'r_f');
    test.is(unionAutomata.rules[7].to.stackTop, 'Sa');
    test.is(unionAutomata.rules[8].from.state.name, 'r_f');
    test.is(unionAutomata.rules[8].from.stackTop, 'a');
    test.is(unionAutomata.rules[8].to.state.name, 'r_f');
    test.is(unionAutomata.rules[8].to.stackTop, '');
    test.is(unionAutomata.rules[9].from.state.name, 'r_f');
    test.is(unionAutomata.rules[9].from.stackTop, 'S');
    test.is(unionAutomata.rules[9].to.state.name, 'r_f');
    test.is(unionAutomata.rules[9].to.stackTop, '');

    test.is(unionAutomata.initialStackSymbol, '');
    test.deepEqual(unionAutomata.stackAlphabet, ['a', 'S', 'b']);
});