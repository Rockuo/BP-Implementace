import Alphabet from './Automata/Alphabet.js';
import prefixes from './operations/prefixesFA';
import {toPlain} from './Automata/services/plainAutomata';
import PA from "./Automata/PA";
import FA from "./Automata/FA";
import DFA from "./Automata/DFA";
import intersectionFA from "./operations/intersectionFA";
import insertion from "./operations/insertionFA";
import reverse from "./operations/reverseFA";
import fullAlphabetDeletion from "./operations/fullAlphabetDeletionFA";


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
let plainPA2 = {
    states: [{name: 's'}, {name: 'f'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 's'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: 'Sa'},
            symbol: 'a',
        },
        {
            from: {state: {name: 's'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: 'Sa'},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'a'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'a',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'a'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'b',
        },
        {
            from: {state: {name: 'f'}, stackTop: 'S'},
            to: {state: {name: 'f'}, stackTop: ''},
            symbol: 'a',
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
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}, {name: 'n3'}, {name: 'n4'}],
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
            symbol: 'a',
        },
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n3'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'n3'}},
            to: {state: {name: 'n4'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n2'}, {name: 'n4'}],
    initialState: {name: 'n0'}
};
let simple2 = {
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n2'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n2'}],
    initialState: {name: 'n0'}
};


let plain3 = {
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



    let automata = fullAlphabetDeletion(new FA(plain3), new Alphabet(...['b']));
    console.log(automata.accepts('c'));

