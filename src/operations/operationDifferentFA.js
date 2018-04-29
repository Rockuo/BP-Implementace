//@flow
import union from './union';
import difference from "./differenceFA";
import intersectionFA from "./intersectionFA";
import FA from "../Automata/FA/FA";

/**
 *
 * @param  left
 * @param  right
 */
export default function operationDifferent(left:FA, right:FA): ?FA {
    // $FlowFixMe
    let _union:FA = union(left,right);
    return difference(_union, intersectionFA(left,right));
}