//@flow
import FA from '../Automata/FA/FA';
import concatenation from "./concatenationFA";
import difference from "./differenceFA";

/**
 * Unikátní konkatenace
 * Concatenation(L, K) − L − K
 * @param left
 * @param right
 */
export default function uniqueConcatenation(left: FA, right: FA): ?FA {
    return difference(difference(concatenation(left, right), left), right);
}

