//@flow
import State from "./State";


/**
 * Stav spojený ze dvou jiných stavů (které ve výsledném automatu být mohou/nemusí)
 * @type {State}
 * @property {string} name
 * @property {boolean} isInitial
 * @property {boolean} isFinal
 * @property {State} oldLeft
 * @property {State} oldRight
 */
export default class MergedState extends State {
    oldLeft: State|MergedState;
    oldRight: State|MergedState;

    /**
     * @param lState
     * @param rState
     */
    constructor(lState: State, rState: State) {
        super({
            name: MergedState.createName(lState, rState),
            isInitial: lState.isInitial && rState.isInitial,
            isFinal: lState.isFinal && rState.isFinal
        });
        this.oldLeft = lState;
        this.oldRight = rState;
    }

    /**
     * Vrací spojené jméno
     * @param lState
     * @param rState
     * @return {string}
     */
    static createName(lState: State|string, rState: State|string) {
        return `${lState instanceof State?lState.name:lState}-${rState instanceof State?rState.name:rState}`;
    }
};