import Automata from './Automata/Automata.js';
import _ from 'lodash';

let plain = {
    states: [{name:'s'},{name:'f'}],
    alphabet: ['a'],
    rules: [{
        from: {name: 's'},
        to: {name: 'f'},
        symbol: 'a',
    }],
    finalStates: [{name:'f'}],
    initialState: {name:'s'}
};

let automata = new Automata(plain);

let automata2 = _.cloneDeep(automata);

console.log(automata.states.s.isInitial);
console.log(automata2.states.s.isInitial);