module.exports = {
    automata: function (automata, lang) {
        console.log('Automat:');
        console.dir(automata, { depth: null });
        console.log('\n');
        console.log('Regex jazyka automatu: '+lang);
        console.log('---------------------------------------------------');
        console.log('Operací generovaný automat přijímá:\n')
    },
    automataLR: function (automata, lang,left = true) {
        console.log((left?'Levý':'Pravý')+' Automat:');
        console.dir(automata, { depth: null });
        console.log('\n');
        console.log('Regex jazyka automatu: '+lang);
        if(!left) {
            console.log('---------------------------------------------------');
            console.log('Operací generovaný automat přijímá:')
        }
        console.log('\n');
    },
    accepts: function (automata, str) {
        console.log(`Řetězec: '${str}' -> ${automata.accepts(str)}`);
    }
};