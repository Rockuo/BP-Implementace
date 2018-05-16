//@flow
import State from './State/State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';


import type {T_PlainRule} from './Rule';
import type {T_PlainState} from './State/State';
import {objectValues} from "./services/object";
import {AbstractClassException} from "./exceptions";


/**
 * Datový typ pro čistý automat
 */
export type T_PlainAutomata = {
    states: T_PlainState[],
    alphabet: string[],
    rules: T_PlainRule[],
    initialState: T_PlainState,
    finalStates: T_PlainState[],
};

/**
 * Třída reprezentující automat
 * @abstract
 * @type {Automata}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
export default class Automata {
    /** Stavy dle jména */
    states: { [key: string]: State };
    /** Abeceda (unikátní)*/
    alphabet: Alphabet;
    /** Pole pravidel */
    rules: Rule[];
    /** Počáteční stav*/
    initialState: State;
    /** Koncové stavy dle jména*/
    finalStates: { [key: string]: State };
    /**
     * Objekt pravidel která se mají ignorovat
     * @protected
     */
    _ignoreRules: { [key: string]: string };

    /**
     * @param {T_PlainAutomata} settings
     */
    constructor(settings?: T_PlainAutomata) {
        // tato třída je abstraktní, je li instancializována přímo, => vyjímka
        if(this.constructor.name === 'Automata') {
            throw new AbstractClassException(this.constructor.name)
        }
        // pokud není dle čeho instancializovat, vytváříme prázdný
        if (settings) {
            this._initFromPlain(settings);
        }
    }

    /**
     * Overridnutelná metoda pro vytvoření automatu ze zadaného objektu
     * @param {T_PlainState[]} states
     * @param {string[]} alphabet
     * @param {T_PlainRule[]} rules
     * @param {T_PlainState} initialState
     * @param {T_PlainState[]} finalStates
     * @private
     */
    _initFromPlain({states, alphabet, rules, initialState, finalStates}: T_PlainAutomata) {
        this.states = State.createStates(states);
        this.alphabet = new Alphabet(...alphabet);
        this.rules = this._createRules(rules, this.states);
        this.initialState = this.states[initialState.name];
        this.initialState.setAsInitial();
        this.finalStates = this._findFinalStates(finalStates);
    }

    /**
     * Overridnutelná metoda pro vytvoření pravidel ze zadaného čistého objektu pravidel a stavů
     * @param {array} plainRules
     * @param states
     */
    _createRules(plainRules: T_PlainRule[], states: { [key: string]: State }): Rule[] {
        return plainRules.map(plainRule => new Rule({
            from: {state: states[plainRule.from.state.name]},
            to: {state: states[plainRule.to.state.name]},
            symbol: plainRule.symbol
        }));
    }

    /**
     * Vynutí, aby byl pouze jeden koncový stav
     */
    forceOneFinalState() {
        // vytvoří nový konecný stav
        let newFinalState = new State({
            name: 'F-' + objectValues(this.finalStates).map((state: State) => state.name).join('-'),
            isFinal: true
        });
        // všechny původní koncové stavy nastaví jako nekoncové a vytvoří z nich epsilon přechod no nového koncového stavu
        for (let state of objectValues(this.finalStates)) {
            state.isFinal = false;
            this.rules.push(new Rule({from: {state}, to: {state: newFinalState}, symbol: ''}))
        }
        //přidá koncový stav
        this.finalStates = {[newFinalState.name]: newFinalState};
        this.states[newFinalState.name] = newFinalState;
    }

    /**
     * Najde reference na koncové stavy dle jejich prosté reprezentace
     * @param {array} finalStates
     * @returns {object}
     * @private
     */
    _findFinalStates(finalStates: T_PlainState[]): { [key: string]: State } {
        let finalNames = finalStates.map((state:State)=> state.name);
        return _.pickBy(this.states, state => {
            if (finalNames.includes(state.name)) {
                state.setAsFinal();
                return true;
            }
            return false;
        });
    }

    /**
     * Odstraní nedostupné stavy
     */
    removeUnreachableStates() {
        this.states = {[this.initialState.name]: this.initialState};
        this._ignoreRules = {};
        this._removeUnreachableStates([this.initialState]);
        this._removeUnattachedRules();
        for (let fState:State of objectValues(this.finalStates)){
            if(!this.states[fState.name]){
                delete this.finalStates[fState.name];
            }
        }
    }

    /**
     * Smaže neukončující stavy(a přechody k nim)
     */
    removeTrapStates() {
        this.states = {...this.finalStates};
        this._ignoreRules = {};
        this._removeTrapStates(objectValues(this.finalStates));
        this._removeUnattachedRules();
        this.states[this.initialState.name] = this.initialState;
    }

    /**
     * Odstraní přechody pro která neexistují stavy
     * @private
     */
    _removeUnattachedRules() {
        let newRules = [];
        let states = objectValues(this.states);
        for (let rule of this.rules) {
            if (
                states.filter(state => rule.from.state.name === state.name).length > 0 &&
                states.filter(state => rule.to.state.name === state.name).length > 0
            ) {
                newRules.push(rule);
            }
        }
        this.rules = newRules;
    }

    /**
     * Odstraní nedostupné stavy
     * @param {State[]} reachables
     * @private
     */
    _removeUnreachableStates(reachables: State[] = [this.initialState]) {
        for (let reachable of reachables) {
            let newReachable = this.rules
                .filter((rule: Rule) => rule.from.state.equals(reachable) && !this.states[rule.to.state.name])
                .map((rule: Rule) => {
                    let state = rule.to.state;
                    this.states[state.name] = state;
                    return state
                });

            if (newReachable.length) {
                this._removeUnreachableStates(newReachable);
            }
        }
    }

    /**
     * Odstraní stavy ze kterých není možné se dostat do koncového
     * @param useful
     * @private
     */
    _removeTrapStates(useful: State[]) {
        for (let finalState of (useful: State[])) {
            let newUseful = this.rules
                .filter((rule: Rule) => rule.to.state.name === finalState.name && !this.states[rule.from.state.name])
                .map((rule: Rule) => {
                    let state = rule.from.state;
                    this.states[state.name] = state;
                    return state
                });

            if (newUseful.length) {
                this._removeTrapStates(newUseful);
            }
        }
    }

    /**
     * Najde přechod ze stavu "from" pomocí symbolu "symbol"
     * @param {State} from
     * @param {string} symbol
     * @return {Rule<>[]}
     * @private
     */
    _findRules(from: State, symbol?: (string|void) = undefined): Rule[] {
        return this.rules
            .filter((rule: Rule) => !(this._ignoreRules[rule.from.state.name] === rule.symbol))
            .filter((rule: Rule) => rule.from.state.name === from.name)
            .filter((rule: Rule) => symbol === undefined || rule.symbol === symbol);
    }

    /**
     * Zajistí právě jeden uklízecí stav
     */
    ensureOneTrapState() {
        //odstraní všechny "uklízecí" stavy
        this.removeTrapStates();

        //vytvoří nový "uklízecí stav"
        let cleanState = new State({
            name: `clean(id_${State.randomName()})`
        });
        // přidá nový stav
        this.states[cleanState.name] = cleanState;

        /*
            Pro všechny stavy najdeme symboly pro které neexistují přechody z daného stavu
            Následě vytvoříme přechody z daného stavu pomocí daného symbolu do nového stavu clean(id_...)
         */
        for (let state of objectValues(this.states)) {
            let existingSymbols = this._findRules(state).map((rule: Rule) => rule.symbol);
            for (let symbol of this.alphabet) {
                if (existingSymbols.indexOf(symbol) < 0) {
                    this.rules.push(new Rule({from: {state}, to: {state: cleanState}, symbol}));
                }
            }
        }
        // pro každý symbol cyklíme v uklízecím stavu
        for (let symbol of this.alphabet) {
            this.rules.push(new Rule({from: {state: cleanState}, to: {state: cleanState}, symbol}));
        }
    }

    /**
     * Sleduje epsilon přechody z daného stavu a přepisuje je na přechody z cílového stavu epsilon přechodu
     * (byl-li cílový stav koncový, nastaví tento stav jako koncový)
     * @param state
     * @private
     */
    _followEmptyRules(state: State) {
        let found;
        do {
            let emptyRules = this._findRules(state, '');
            found = !!emptyRules.length;
            for (let emptyRule of emptyRules) {
                //odstraní epsilon přechod
                _.remove(this.rules, (rule: Rule) => rule.equals(emptyRule));
                //pro všechny přechody z cílového stavu
                let nextStateRules = this._findRules(emptyRule.to.state);
                for (let nextStateRule of nextStateRules) {
                    // se přidají přechody do původního stavu   
                    this.rules.push(new Rule({
                        from: {state: state},
                        symbol: nextStateRule.symbol,
                        to: nextStateRule.to
                    }));
                }
                if (emptyRule.to.state.isFinal) {
                    state.isFinal = true
                }
            }
        // pokud byly nalezen prázný přechod, hledej znovu v nových přepsaných přechodech
        } while (found)
    }

    /**
     * Odstraní epsilon přechody
     */
    removeEmptyRules() {
        //vyčstíme si ignore rules (jen pro jistotu)
        this._ignoreRules = {};
        for (let state of objectValues(this.states)) {
            this._followEmptyRules(state);
        }
        this.removeUnreachableStates();
    }

    /**
     * @param {State} state
     */
    addState(state: State) {
        this.states[state.name] = state;
    }

    /**
     * @param {string} symbol
     */
    addSymbol(symbol: string) {
        this.alphabet.push(symbol);
    }

    /**
     * @param {Rule} rule
     */
    addRule(rule: Rule) {
        this.rules.push(rule);
    }
};