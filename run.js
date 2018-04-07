import Automata from './Automata/Automata.js';
import intersectionFA from './operations/intersectionFA';
import {toPlain} from './Automata/services/plainAutomata';
import PA from "./Automata/PA";
import FA from "./Automata/FA";
import DFA from "./Automata/DFA";


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

let plain2 = {
    states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
    alphabet: ['a', 'b'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q0'}},
            symbol: 'a',
        },
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
        }
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};

let l_automata = new FA(plain1);
let r_automata = new FA(plain2);
let intersecred = intersectionFA(l_automata, r_automata);
console.log(intersecred.accepts('ab'));

