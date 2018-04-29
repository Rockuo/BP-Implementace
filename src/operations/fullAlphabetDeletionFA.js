//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from "../Automata/services/plainFA";
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";
import Alphabet from "../Automata/Alphabet";

/**
 * Smazání abecedy (posloupnosti symbolů) z Konečného automatu
 * @param {FA} fa
 * @param {Alphabet} alphabet
 * @return {FA}
 */
export default function fullAlphabetDeletion(fa: FA, alphabet:Alphabet): FA {
    let newFA = new FA(toPlain(fa));
    newFA.rules.forEach((rule: Rule) => {if (alphabet.includes(rule.symbol)) rule.symbol = ''});
    return newFA;
}