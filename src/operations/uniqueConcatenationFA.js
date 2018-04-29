//@flow
import FA from '../Automata/FA/FA';
import concatenation from "./concatenationFA";
import difference from "./differenceFA";

// Concatenation(L, K) − L − K
export default function uniqueConcatenation(left: FA, right: FA): ?FA {
    return difference(difference(concatenation(left, right), left), right);
}

