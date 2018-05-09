//@flow

/**
 * @type {Stack}
 * @property {string[]} stack
 */
export default class Stack {

    stack:string[];

    constructor(initialState:string) {
        this.stack = [initialState];
    }

    get length():number {
        return this.stack.length;
    }

    /**
     * Vrací vrchol zásobníku
     * @return {string}
     */
    peek():string {
        return this.stack[this.length-1];
    }

    /**
     * Přepíše vrchop zásobníku, vrací true, pokud nedošlo k chybě
     * @param {string} expectedTop
     * @param {string} nextTop
     * @return {boolean}
     */
    write(expectedTop:string, nextTop:string):boolean {
        if(expectedTop !== ''){
            if(expectedTop === this.peek())
            {
                this.stack.pop();
            } else {
                return false;
            }
        }

        if(nextTop.length) {
            this.stack.push(...nextTop.split(''));
        }
        return true;
    }
}