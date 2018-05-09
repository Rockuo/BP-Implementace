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


runTest('acceptSimple', test => {
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


let plain2 = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}, {name: 'q3'}],
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
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q3'}},
            symbol: '',
        },
        {
            from: {state: {name: 'q3'}},
            to: {state: {name: 'q1'}},
            symbol: '',
        },
        {
            from: {state: {name: 'q3'}},
            to: {state: {name: 'q3'}},
            symbol: 'c',
        }
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};


runTest('acceptTricky', test => {
    let automata = new FA(plain2);
    test.true(automata.accepts('a'));
    test.true(automata.accepts('ab'));
    test.true(automata.accepts('ba'));
    test.true(automata.accepts('bab'));
    test.true(automata.accepts('babccbcb'));
    test.true(automata.accepts('bacc'));
    test.false(automata.accepts('aba'));
    test.false(automata.accepts('b'));
    test.false(automata.accepts('baba'));
    test.false(automata.accepts('ban'));
});
