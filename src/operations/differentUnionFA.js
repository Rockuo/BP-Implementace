//@flow
import union from './union';
import DFA from "../Automata/FA/DFA";
import difference from "./differenceFA";
import FA from "../Automata/FA/FA";

/**
 * Rozdílné sjednocení
 * @param  left
 * @param  right
 */
export default function differentUnion(left:FA, right:FA): ?FA {
    let diff1 = DFA.covertFromFA(difference(left,right));
    let diff2 = DFA.covertFromFA(difference(right,left));
    // Pokud DFA rozdílu nemá koncové stavy => L1-L2 ={} && L2-L1 ={} => L1=L2
    if(Object.keys(diff1.finalStates).length !== 0 || Object.keys(diff2.finalStates).length !== 0) {
        // $FlowFixMe
        return union(left, right);
    }
}