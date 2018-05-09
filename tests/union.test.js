let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const FA = require(`../${source}/Automata/FA/FA`).default;
const PA = require(`../${source}/Automata/PA/PA`).default;
const union = require(`../${source}/operations/union`).default;
const State = require(`../${source}/Automata/State/State`).default;


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

runTest('unionAutomata', test => {
    let l_automata = new FA(plain), r_automata = new FA(plain);

    let unionAutomata = union(l_automata, r_automata);

    test.is(Object.keys(unionAutomata.states).length, 5);

    test.true(unionAutomata.states['l_s'] instanceof State);
    test.true(unionAutomata.states['l_f'] instanceof State);
    test.true(unionAutomata.states['r_s'] instanceof State);
    test.true(unionAutomata.states['r_f'] instanceof State);

    test.is(unionAutomata.alphabet.length, 1);
    test.is(unionAutomata.alphabet[0], 'a');

    test.is(Object.keys(unionAutomata.finalStates).length, 2);

    test.is(unionAutomata.initialState.name[0], 's');

    test.is(unionAutomata.rules.length, 6);
    test.is(unionAutomata.rules[0].from.state.name[0], 's');
    test.is(unionAutomata.rules[0].to.state.name, 'l_s');
    test.is(unionAutomata.rules[1].from.state.name[0], 's');
    test.is(unionAutomata.rules[1].to.state.name, 'r_s');
    test.is(unionAutomata.rules[2].from.state.name, 'l_s');
    test.is(unionAutomata.rules[2].to.state.name, 'l_f');
    test.is(unionAutomata.rules[3].from.state.name, 'l_f');
    test.is(unionAutomata.rules[3].to.state.name, 'l_f');
    test.is(unionAutomata.rules[4].from.state.name, 'r_s');
    test.is(unionAutomata.rules[4].to.state.name, 'r_f');
    test.is(unionAutomata.rules[5].from.state.name, 'r_f');
    test.is(unionAutomata.rules[5].to.state.name, 'r_f');
});


runTest('unionPA', test => {
    let l_automata = new PA(plainPA), r_automata = new PA(plainPA);

    let unionAutomata = union(l_automata, r_automata, PA);

    test.is(Object.keys(unionAutomata.states).length, 5);
    test.true(unionAutomata.states['l_f'].isFinal);
    test.true(unionAutomata.states['r_f'].isFinal);

    test.true(unionAutomata.states['l_s'] instanceof State);
    test.true(unionAutomata.states['l_f'] instanceof State);
    test.true(unionAutomata.states['r_s'] instanceof State);
    test.true(unionAutomata.states['r_f'] instanceof State);

    test.is(unionAutomata.alphabet.length, 1);
    test.is(unionAutomata.alphabet[0], 'a');

    test.is(Object.keys(unionAutomata.finalStates).length, 2);

    test.is(unionAutomata.initialState.name[0], 's');

    test.is(unionAutomata.rules.length, 8);
    test.is(unionAutomata.rules[0].from.state.name[0], 's');
    test.is(unionAutomata.rules[0].from.stackTop, 'S');
    test.is(unionAutomata.rules[0].to.state.name, 'l_s');
    test.is(unionAutomata.rules[1].from.state.name[0], 's');
    test.is(unionAutomata.rules[1].from.stackTop, 'S');
    test.is(unionAutomata.rules[1].to.state.name, 'r_s');

    test.is(unionAutomata.rules[2].from.state.name, 'l_s');
    test.is(unionAutomata.rules[2].from.stackTop, 'S');
    test.is(unionAutomata.rules[2].to.state.name, 'l_f');
    test.is(unionAutomata.rules[2].to.stackTop, 'Sa');
    test.is(unionAutomata.rules[3].from.state.name, 'l_f');
    test.is(unionAutomata.rules[3].from.stackTop, 'a');
    test.is(unionAutomata.rules[3].to.state.name, 'l_f');
    test.is(unionAutomata.rules[3].to.stackTop, '');
    test.is(unionAutomata.rules[4].from.state.name, 'l_f');
    test.is(unionAutomata.rules[4].from.stackTop, 'S');
    test.is(unionAutomata.rules[4].to.state.name, 'l_f');
    test.is(unionAutomata.rules[4].to.stackTop, '');

    test.is(unionAutomata.rules[5].from.state.name, 'r_s');
    test.is(unionAutomata.rules[5].from.stackTop, 'S');
    test.is(unionAutomata.rules[5].to.state.name, 'r_f');
    test.is(unionAutomata.rules[5].to.stackTop, 'Sa');
    test.is(unionAutomata.rules[6].from.state.name, 'r_f');
    test.is(unionAutomata.rules[6].from.stackTop, 'a');
    test.is(unionAutomata.rules[6].to.state.name, 'r_f');
    test.is(unionAutomata.rules[6].to.stackTop, '');
    test.is(unionAutomata.rules[7].from.state.name, 'r_f');
    test.is(unionAutomata.rules[7].from.stackTop, 'S');
    test.is(unionAutomata.rules[7].to.state.name, 'r_f');
    test.is(unionAutomata.rules[7].to.stackTop, '');

    test.is(unionAutomata.initialStackSymbol, 'S');
    test.deepEqual(unionAutomata.stackAlphabet, ['S','a']);
});