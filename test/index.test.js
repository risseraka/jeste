const jeste = require('../');

const render = jeste({ dir: 'views' });

const result = render('index', {
    test: 'toto',
    repeat: (i, func) => [...new Array(i)].map(func),
})

console.log(result);
