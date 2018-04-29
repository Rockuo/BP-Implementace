//@flow
import FA from '../Automata/FA/FA';
import intersectionFA from "./intersectionFA";
import complement from "./complementFA";
import Alphabet from "../Automata/Alphabet";

/**
 * Rozdíl
 * @param {FA} left
 * @param {FA} right
 */
export default function difference(left: FA, right: FA): FA {
    right = right.clone();
    right.alphabet = new Alphabet(...right.alphabet, ...left.alphabet);
    return intersectionFA(left, complement(right));
}

