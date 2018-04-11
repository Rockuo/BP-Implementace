import Automata from './Automata/Automata.js';
import prefixes from './operations/prefixesFA';
import {toPlain} from './Automata/services/plainAutomata';
import PA from "./Automata/PA";
import FA from "./Automata/FA";
import DFA from "./Automata/DFA";
import intersectionFA from "./operations/intersectionFA";
import shuffle from "./operations/shuffleFA";


let plainPA = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 's'}, stackTop:'S' },
            to: {state: {name: 'f'}, stackTop:'Sa'},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop:'a'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop:'S'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'},
    initialStackSymbol: 'S',
    stackAlphabet: ['a', 'S']
};
let plainPA2 = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 's'}, stackTop:'S' },
            to: {state: {name: 'f'}, stackTop:'Sa'},
            symbol: 'a',
        },
        {
            from: {state: {name: 's'}, stackTop:'S' },
            to: {state: {name: 'f'}, stackTop:'Sa'},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop:'a'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop:'a'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop:'S'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop:'S'},
            to: {state: {name: 'f'}, stackTop:''},
            symbol: 'b',
        }
    ],
    finalStates: [{name: 'f'}],
    initialState: {name: 's'},
    initialStackSymbol: 'S',
    stackAlphabet: ['a', 'S']
};

let plain1 = {
    states: [{name: 'b0'}, {name: 'b1'},],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'b0'}},
            to: {state: {name: 'b0'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'b0'}},
            to: {state: {name: 'b1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'b1'}},
            to: {state: {name: 'b1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'b1'}],
    initialState: {name: 'b0'}
};

let plain2 = {
    states: [{name: 'a0'}, {name: 'a1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'a0'}},
            to: {state: {name: 'a0'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'a0'}},
            to: {state: {name: 'a1'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'a1'}},
            to: {state: {name: 'a1'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'a1'}],
    initialState: {name: 'a0'}
};
//
// let plain1 = {
//     states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
//     alphabet: ['a', 'b'],
//     rules: [
//         {
//             from: {state: {name: 'q0'}},
//             to: {state: {name: 'q0'}},
//             symbol: 'b',
//         },
//         {
//             from: {state: {name: 'q0'}},
//             to: {state: {name: 'q1'}},
//             symbol: 'a',
//         },
//         {
//             from: {state: {name: 'q1'}},
//             to: {state: {name: 'q1'}},
//             symbol: 'b',
//         },
//         {
//             from: {state: {name: 'q1'}},
//             to: {state: {name: 'q2'}},
//             symbol: 'a',
//         }
//     ],
//     finalStates: [{name: 'q1'}],
//     initialState: {name: 'q0'}
// };
//
// let plain2 = {
//     states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
//     alphabet: ['a', 'b'],
//     rules: [
//         {
//             from: {state: {name: 'q0'}},
//             to: {state: {name: 'q0'}},
//             symbol: 'a',
//         },
//         {
//             from: {state: {name: 'q0'}},
//             to: {state: {name: 'q1'}},
//             symbol: 'b',
//         },
//         {
//             from: {state: {name: 'q1'}},
//             to: {state: {name: 'q1'}},
//             symbol: 'a',
//         },
//         {
//             from: {state: {name: 'q1'}},
//             to: {state: {name: 'q2'}},
//             symbol: 'b',
//         }
//     ],
//     finalStates: [{name: 'q1'}],
//     initialState: {name: 'q0'}
// };

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



let automata = shuffle(new FA(plain2),new FA(plain1));
console.log(automata.accepts('ba'));
console.log(automata.debugRoute);


// console.log(automata.accepts('cadbb'));
// console.log(automata.accepts('cabdb'));
// console.log(automata.accepts('cabbd'));
// console.log(automata.accepts('acdbb'));
// console.log(automata.accepts('acbdb'));
// console.log(automata.accepts('acbdb'));
// console.log(automata.accepts('abcdb'));
// console.log(automata.accepts('abcbd'));
// console.log(automata.accepts('abbcd'));
