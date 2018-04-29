//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from "../Automata/services/plainFA";
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";


export default function reverseFA(fa: FA): FA {
    let newFA = new FA(toPlain(fa));
    newFA.forceOneFinalState();
    let newInitial:State =  objectValues(newFA.finalStates)[0];
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