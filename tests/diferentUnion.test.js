let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const FA = require(`../${source}/Automata/FA/FA`).default;
const PA = require(`../${source}/Automata/PA/PA`).default;
const differentUnion = require(`../${source}/operations/differentUnionFA`).default;
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

runTest('unionAutomata', test => {
    let l_automata = new FA(plain), r_automata = new FA(plain);

    let unionAutomata = differentUnion(l_automata, r_automata);
    test.false(!!unionAutomata);

    r_automata = new FA(plainB);
    unionAutomata = differentUnion(l_automata, r_automata);
    test.true(!!unionAutomata, true);
});