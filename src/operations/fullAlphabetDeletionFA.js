//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from "../Automata/services/plainAutomata";
import Rule from "../Automata/Rule";
import {objectTypedValues} from "../Automata/services/object";
import State from "../Automata/State/State";
import Alphabet from "../Automata/Alphabet";


export default function fullAlphabetDeletion(fa: FA, alphabet:Alphabet): FA {
    let newFA = new FA(toPlain(fa));
    newFA.rules.forEach((rule: Rule) => {if (alphabet.includes(rule.symbol)) rule.symbol = ''});
    return newFA;
}