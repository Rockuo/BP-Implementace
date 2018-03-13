import Automata from './Automata/Automata.js';
import union from './operations/union';
import {toPlain} from './Automata/services/plainAutomata';
import PA from "./Automata/PA";


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

let l_automata = new PA(plainPA), r_automata = new PA(plainPA);

let unionAutomata = union(l_automata, r_automata, PA);

console.log(united);