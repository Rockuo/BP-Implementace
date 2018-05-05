let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const FA = require(`../${source}/Automata/FA/FA`).default;
const reverse = require(`../${source}/operations/reverseFA`).default;

let plain1 = {
    states: [{name: 'q0'}, {name: 'q1'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q0'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q1'}},
            symbol: 'c',
        },
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};



runTest('simple', test => {
    let automata = reverse(new FA(plain1));
    test.true(automata.accepts('cab'));
    test.true(automata.accepts('ccabb'));
});
