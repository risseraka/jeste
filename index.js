const fs = require('fs');
const path = require('path');
const vm = require('vm');

const render = require('./render');

exports = module.exports = (options = {}) => {
    const {
        dir = '.',
        cache = true,
        locals = {},
        displayErrors = true,
    } = options;

    const internalCache = {};

    return function renderer(file, data) {
        // Allow file name to not contain js extension
        const fileName = `${file.replace(/\.js$/, '')}.js`;
        const filePath = path.join(dir, fileName);

        // If no data is passed, curry the function
        if (!data) return obj => render(filePath, obj);

        let content;
        if (cache && internalCache[filePath]) {
            content = internalCache[filePath];
        } else {
            content = fs.readFileSync(filePath);

            if (cache) {
                internalCache[filePath] = content;
            }
        }

        return render(content, { locals, data }, { filePath, displayErrors });
    }
};
