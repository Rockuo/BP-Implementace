//@flow
import FA from '../Automata/FA';
import State from "../Automata/State";
import MergedState from "../Automata/MergedState";
import {generateStates} from "./intersectionFA";
import Rule from "../Automata/Rule";
import Automata from "../Automata/Automata";
import Alphabet from "../Automata/Alphabet";

// {
//     states: [{name: 'q0'}, {name: 'q1'}, {name: 'q2'}],
//         alphabet: ['a', 'b'],
//     rules: [
//     {
//         from: {state: {name: 'q0'}},
//         to: {state: {name: 'q0'}},
//         symbol: 'b',
//     },
//     {
//         from: {state: {name: 'q0'}},
//         to: {state: {name: 'q1'}},
//         symbol: 'a',
//     },
//     {
//         from: {state: {name: 'q1'}},
//         to: {state: {name: 'q1'}},
//         symbol: 'b',
//     },
//     {
//         from: {state: {name: 'q1'}},
//         to: {state: {name: 'q2'}},
//         symbol: 'a',
//     }
// ],
//     finalStates: [{name: 'q1'}],
//     initialState: {name: 'q0'}
// };

/**
 *
 * @param  left
 * @param  right
 */
export default function shuffle(left: FA, right: FA): ?FA {
    let rules = [];
    let {newStates, newFinals, newInitial} = generateStates(left.states, right.states);
    let automata = new FA();
    automata.alphabet = new Alphabet(...[...left.alphabet, ...right.alphabet]);
    // $FlowFixMe
    automata.states = newStates;
    // $FlowFixMe
    automata.finalStates = newFinals;
    // $FlowFixMe
    automata.initialState = newInitial;
    automata.rules = createRules(left, right, newStates);
    return automata;
}

function createRules(left: FA, right: FA, newStates:{ [key: string]: MergedState }): Rule[] {
    let newRules = [];
    for (let newState:MergedState of Object.values(newStates)) {
        let leftRules = left.rules.filter((rule:Rule) => rule.from.state.name === newState.oldLeft.name);
        for (let rule:Rule of leftRules) {
            newRules.push(new Rule({
                from:{state:newState},
                symbol:rule.symbol,
                to: {state: newStates[MergedState.createName(rule.to.state, newState.oldRight)]}
            }));
        }

        let rightRules = right.rules.filter((rule:Rule) => rule.from.state.name === newState.oldRight.name);
        for (let rule:Rule of rightRules) {
            newRules.push(new Rule({
                from:{state:newState},
                symbol:rule.symbol,
                to: {state: newStates[MergedState.createName(newState.oldLeft, rule.to.state)]}
            }));
        }

    }

    return newRules;
}