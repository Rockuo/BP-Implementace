//@flow
import FA from '../Automata/FA/FA';
import State from '../Automata/State/State';
import Alphabet from '../Automata/Alphabet';
import MergedState from '../Automata/State/MergedState';
import _ from 'lodash';
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";

/**
 * Průnik Konečného automatu
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
export default function intersectionFA(left: FA, right: FA): FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();

    let {newStates, newFinals, newInitial} = generateStates(left.states, right.states),
        newAutomata = new FA();
    // $FlowFixMe
    newAutomata.states = newStates;
    // $FlowFixMe
    newAutomata.finalStates = newFinals;
    // $FlowFixMe
    newAutomata.initialState = newInitial;
    newAutomata.alphabet = new Alphabet(...[...left.alphabet, ...right.alphabet]);
    newAutomata.rules = generateRules(left, right, newStates);
    return newAutomata;
}

export function generateStates(lStates: { [key: string]: State }, rStates: { [key: string]: State }): {
    newStates: { [key: string]: MergedState },
    statesByLeft: { [key: string]: MergedState },
    statesByRight: { [key: string]: MergedState },
    newInitial?: MergedState,
    newFinals: { [key: string]: MergedState }
} {
    let newStates = {}, newFinals = {}, newInitial, statesByLeft = {}, statesByRight = {};
    for(let lState:State of objectValues(lStates)){
        for(let rState:State of objectValues(rStates)){
            let merged = new MergedState(lState, rState);

            newStates[merged.name] = merged;

            if (merged.isFinal) newFinals[merged.name] = merged;
            if (merged.isInitial) newInitial = merged;
        }
    }
    return {newStates, newFinals, newInitial, statesByLeft, statesByRight};
}

function generateRules(left: FA, right: FA, newStates:{ [key: string]: MergedState }): Rule[] {
    let lRules = left.rules, rRules = right.rules;

    let newRules = [];
    for (let mergedState: MergedState of objectValues(newStates)) {
        let filteredLRules= lRules.filter((rule:Rule) => rule.from.state.equals(mergedState.oldLeft));
        for (let lRule of filteredLRules) {
            let filteredRRules = rRules.filter((rule:Rule) => {
                return rule.from.state.equals(mergedState.oldRight) && rule.symbol === lRule.symbol;
            });
            for (let rRule of filteredRRules) {
                newRules.push(new Rule({
                    from:{state:mergedState},
                    symbol:rRule.symbol,
                    to:{state:newStates[MergedState.createName(lRule.to.state, rRule.to.state)]}
                }));
            }
        }
    }

    return newRules;
}