const halte = require('../halte');

const middleware = halte({
    dir: './views',
});

const repeat = (i, f) => [...new Array(i)].map(f);

const req = {
    accepts() {
        return 'json';
    }
};

const res = {
    set() {},
    json() {},
    send(content) {
        console.log('res.send:');
        console.log(content);
    }
};

const next = (e) => {
    if (e) throw e;

    res.halte('index', {
        test: 'tata',
        repeat,
    });
};

middleware(req, res, next);
