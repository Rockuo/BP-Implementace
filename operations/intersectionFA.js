//@flow
import FA from '../Automata/FA';
import State from '../Automata/State';
import Alphabet from '../Automata/Alphabet';
import MergedState from '../Automata/MergedState';
import _ from 'lodash';
import Rule from "../Automata/Rule";
import {objectTypedValues} from "../extensions/simple";

export default function intersectionFA(left: FA, right: FA): FA {
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
    _.each(lStates, (lState: State) => _.each(rStates, rState => {
        let merged = new MergedState(lState, rState);

        newStates[merged.name] = merged;

        if (merged.isFinal) newFinals[merged.name] = merged;
        if (merged.isInitial) newInitial = merged;

    }));
    return {newStates, newFinals, newInitial, statesByLeft, statesByRight};
}

function generateRules(left: FA, right: FA, newStates:{ [key: string]: MergedState }): Rule[] {
    let lRules = left.rules, rRules = right.rules;

    let newRules = [];


    let newStatesArr = (objectTypedValues(newStates): MergedState[]);

    for (let state of objectTypedValues(left.states)) {
        let fromStates = newStatesArr.filter((mState:MergedState)=> state.name === mState.oldLeft.name),
            lStateRules = lRules.filter((rule:Rule) => rule.from.state.name === state.name);

        for (let lStateRule of lStateRules) {
            for (let fromState of fromStates) {
                let rStateRules = rRules.filter(
                    (rule:Rule) => (rule.from.state.name === fromState.oldRight.name && rule.symbol === lStateRule.symbol)
                );
                for (let rStateRule of rStateRules) {
                    newRules.push(new Rule({
                        from:{state: fromState},
                        to:{state: newStates[MergedState.createName(lStateRule.to.state, rStateRule.to.state)]},
                        symbol:rStateRule.symbol}));
                }
            }
        }
    }
    return newRules;
}