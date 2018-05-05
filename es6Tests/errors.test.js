require('babel-register');
const runTest = require('ava');
const Automata = require('../src/Automata/Automata').default;

runTest('abstract', test => {
    let ex;
    try {
        new Automata();
    } catch (e) {
        ex = e;
    }
    test.is(ex.className, 'AbstractClassException');
});
