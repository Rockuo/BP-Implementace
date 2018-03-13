//@flow

export default class Stack {

    _stack:string[];

    constructor(initialState:string) {
        this._stack = [initialState];
    }

    get length():number {
        return this._stack.length;
    }

    peek():string {
        return this._stack[this.length-1];
    }

    write(expectedTop:string, nextTop:string):boolean {
        if(expectedTop !== ''){
            if(expectedTop === this.peek())
            {
                this._stack.pop();
            } else {
                return false;
            }
        }

        if(nextTop.length) {
            this._stack.push(...nextTop.split(''));
        }
        return true;
    }
}