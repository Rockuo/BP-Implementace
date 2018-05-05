import Alphabet from './src/Automata/Alphabet.js';
import prefixes from './src/operations/prefixesFA';
import {toPlain} from './src/Automata/services/plainFA';
import PA from "./src/Automata/PA/PA";
import FA from "./src/Automata/FA/FA";
import DFA from "./src/Automata/FA/DFA";
import intersectionFA from "./src/operations/intersectionFA";
import insertion from "./src/operations/sequentialInsertionFA";
import reverse from "./src/operations/reverseFA";
import fullAlphabetDeletion from "./src/operations/fullAlphabetDeletionFA";
import difference from "./src/operations/differenceFA";
import sequentialDeletion from "./src/operations/sequentialDeletionFA";
import complement from "./src/operations/complementFA";
import interlacement from "./src/operations/interlacementFA";
import {lPop, rPop} from "./src/operations/popFA";
import Automata from "./src/Automata/Automata";

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
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: '',
        },
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
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
let simple2 = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        }
    ],
    finalStates: [{name: 'n1'}],
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


let toDFA = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}, {name: 'q3'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q3'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q2'}},
            to: {state: {name: 'q3'}},
            symbol: 'c',
        }
    ],
    finalStates: [{name: 'q3'}],
    initialState: {name: 'q0'}
};


let aORb = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};


let aPLUS = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

let aSTAR = {
    states: [{name: 'n0'}],
    alphabet: ['a'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n0'}},
            symbol: 'a',
        },
    ],
    finalStates: [{name: 'n0'}],
    initialState: {name: 'n0'}
};


let abaababORbabORc = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}, {name: 'q3'}, {name: 'q4'}, {name: 'q5'}, {name: 'q6'}, {name: 'q7'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q2'}},
            to: {state: {name: 'q3'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q3'}},
            to: {state: {name: 'q4'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q4'}},
            to: {state: {name: 'q5'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q5'}},
            to: {state: {name: 'q6'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q6'}},
            to: {state: {name: 'q7'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q5'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q7'}},
            symbol: 'c',
        },
    ],
    finalStates: [{name: 'q7'}],
    initialState: {name: 'q0'}
};

let ab = {
    states: [{name: 'n0'}, {name: 'n1'}, {name: 'n2'}],
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
    ],
    finalStates: [{name: 'n2'}],
    initialState: {name: 'n0'}
};

let b_aS_bb_S_S = {
    states: [{name:'q0'},{name:'q1'},{name:'q2'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q2'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q2'}},
            to: {state: {name: 'q1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};

let abS = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'n1'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

let b = {
    states: [{name: 'n0'}, {name: 'n1'}],
    alphabet: ['b'],
    rules: [
        {
            from: {state: {name: 'n0'}},
            to: {state: {name: 'n1'}},
            symbol: 'b',
        },
    ],
    finalStates: [{name: 'n1'}],
    initialState: {name: 'n0'}
};

let ex;
try {
    new Automata();
} catch (e) {
    ex = e;
}
console.log(ex.text);