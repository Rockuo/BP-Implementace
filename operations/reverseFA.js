//@flow
import FA from '../Automata/FA';
import {toPlain} from "../Automata/services/plainAutomata";
import Rule from "../Automata/Rule";
import {objectTypedValues} from "../extensions/simple";
import State from "../Automata/State";


export default function reverseFA(fa: FA): FA {
    let newFA = new FA(toPlain(fa));
    newFA.forceOneFinalState();
    let newInitial =  objectTypedValues(newFA.finalStates, State)[0];
    newInitial.isFinal = false;
    newInitial.isInitial = true;
    let newFinal = newFA.initialState;
    newFinal.isInitial = false;
    newFinal.isFinal = true;
    newFA.finalStates = {[newFinal.name]:newFinal};
    newFA.initialState = newInitial;

    newFA.rules = newFA.rules.map((rule: Rule) => new Rule({from: rule.to, to: rule.from, symbol: rule.symbol}));
    return newFA;
}