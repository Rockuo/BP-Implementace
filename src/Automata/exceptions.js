//@flow
export class AbstractClassException extends Error {
    constructor(className: string) {
        super(`${className} is not instantiable`);
    }
}

export class OverloadException extends Error {
    constructor(txt: string = 'No option to overload to') {
        super(txt);
    }
}