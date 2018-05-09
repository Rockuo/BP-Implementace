//@flow
import Automata from '../Automata';
import {toPlain} from "../services/plainFA";
import State from "../State/State";

/**
 * Třída reprezentující konečný automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
export default class FA extends Automata{
    // $FlowFixMe
    constructor(...args:Array<any>) {
        super(...args);
    }

    /**
     * Vrací kopii
     * @return {FA}
     */
    clone(){
        return new FA(toPlain(this));
    }

    /**
     * Vrací true, pokud je řetězec přijímán automatem
     * @param {string} word
     * @param {State} state
     * @param {boolean} initialCall
     * @return {boolean}
     */
    accepts(word: string, state: State = this.initialState, initialCall:boolean = true): boolean {
        if (initialCall) {
            this._ignoreRules = {};
        }


        if (!word) {
            if (state.isFinal) return true;
            for (let rule of this._findRules(state, '')) {
                if (rule.to.state.isFinal) return true;
            }
            return false;
        }
        let symbol = word[0];
        word = word.slice(1);

        for (let rule of this._findRules(state, symbol)) {
            let ignoreBackup = this._ignoreRules;
            this._ignoreRules = {};
            let result = this.accepts(word, rule.to.state, false);
            if (result) {
                return true
            }
            this._ignoreRules = ignoreBackup;
        }

        word = symbol + word;
        for (let rule of this._findRules(state, '')) {
            let ignoreBackup = this._ignoreRules;
            this._ignoreRules[rule.from.state.name] = '';
            let result = this.accepts(word, rule.to.state, false);
            if (result) {
                this._ignoreRules = {};
                return true;
            }
            this._ignoreRules = ignoreBackup;
        }
        return false;
    }
}