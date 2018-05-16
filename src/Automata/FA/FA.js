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
        if (initialCall) { // při prvním volání přemaže přechody které se mají ignorovat
            // tento atribut je zde aby zamezil nekonečným cyklům pomocí epsilon přechodů
            this._ignoreRules = {};
        }

        // testovaný řetězec je prázdný, nebo sme na jeho konci
        if (!word) {
            // ktuální stav je koncový => přijímáno
            if (state.isFinal) return true;
            // existuje epsilon přechod z aktuálního do koncoého stavu => přijímáno
            for (let rule of this._findRules(state, '')) {
                if (rule.to.state.isFinal) return true;
            }
            // jinak řetězec není přijat
            return false;
        }
        // vytáhneme první symbol
        let symbol = word[0];
        word = word.slice(1);

        // pro každý přechod z tohoto stavu pomocí prvního symbolu
        for (let rule of this._findRules(state, symbol)) {
            let ignoreBackup = this._ignoreRules;
            this._ignoreRules = {}; // přechod byl použit => vymažeme ignore
            let result = this.accepts(word, rule.to.state, false);
            //pomocí tohoto přechodu se dostaneme do koncového stavu při zpracování celého řetězce => pijímáno
            if (result) {
                return true
            }
            this._ignoreRules = ignoreBackup; // převidlo nebylo použito, vracíme ignore
        }

        // žádným přechodem pro tento znak jsme se nedostali do stavu kde by byl řetězec přijímán
        // => aplikujeme libovolný epsilon přechod
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