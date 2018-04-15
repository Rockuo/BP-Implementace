// //
// import FA from '../Automata/FA';
// import {toPlain} from '../Automata/services/plainAutomata';
// import {objectTypedValues} from "../extensions/simple";
//
//
// //todo: před tímhle musí být automat deterministický
// //todo: testy
// export default function complement(automata: FA): FA {
//     let resAutomata = new FA(toPlain(automata));
//     resAutomata.finalStates = {};
//     for(let state of objectTypedValues(resAutomata.states)) {
//         state.isFinal = !state.isFinal;
//         if(state.isFinal) {
//             resAutomata.finalStates[state.name] = state;
//         }
//     }
//     return resAutomata;
// }
"use strict";