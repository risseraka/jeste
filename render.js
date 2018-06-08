const vm = require('vm');

function render(content, params = {}, options = {}) {
    const {
        locals,
        data = {},
    } = params;

    const {
        filePath = '',
        displayErrors = true,
    } = options;

    const context = Object.assign(
        {
            get(path) {
                try {
                    with (data) {
                        return eval(path);
                    }
                } catch (e) {
                }
                return undefined;
            },
            render,
        },
        locals,
        { data, result: null }
    );

    const script = new vm.Script(
        `with (data) { result = ${content.toString()} }`,
        { filename: filePath, displayErrors }
    );

    script.runInContext(new vm.createContext(context));

    return context.result;
}

module.exports = render;
