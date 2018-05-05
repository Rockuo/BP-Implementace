let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}

const runTest = require('ava');
const FA = require(`../${source}/Automata/FA/FA`).default;

let plain = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
    alphabet: ['a', 'b'],
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
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};


runTest('accept', test => {
    let automata = new FA(plain);
    test.true(automata.accepts('a'));
    test.false(automata.accepts('b'));
    test.true(automata.accepts('ab'));
    test.true(automata.accepts('ba'));
    test.false(automata.accepts('aba'));
    test.true(automata.accepts('bab'));
    test.false(automata.accepts('baba'));
    test.false(automata.accepts('ban'));
});
