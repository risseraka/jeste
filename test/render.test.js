const render = require('../render.js');

function text() {
    const result = render(`
toto + \`: tata\` + 1`, { data: { toto: 'tata' } });

    console.log(result);
}

function object() {
    const result = render(`
{ toto: toto + 1 }
`, { data: { toto: 'tata' } });

    console.log(result);
}

text();

object();
