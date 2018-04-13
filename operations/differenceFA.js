//@flow
import FA from '../Automata/FA';
import intersectionFA from "./intersectionFA";
import complement from "./complementFA";

//todo: test
//K-L = intersection(K,complement(L))
export default function difference(left: FA, right: FA): FA {
    return intersectionFA(left, complement(right));
}

