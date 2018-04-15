//@flow
import Automata from '../Automata/Automata';
import union from './union';

/**
 *
 * @param  Left
 * @param  Right
 * @param automataType
 */
export default function differentUnion(Left:Automata, Right:Automata, automataType:(typeof Automata) = Automata): ?Automata {
    return Left.equals(Right)?undefined:union(Left,Right,automataType);
}