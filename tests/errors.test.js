const runTest = require('ava');
const Automata = require('../dist/Automata/Automata').default;

runTest('abstract', test => {
    let ex;
    try {
        new Automata();
    } catch (e) {
        ex = e;
    }
    test.is(ex.className, 'AbstractClassException');
});
