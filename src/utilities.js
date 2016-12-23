import fs from 'fs';

export const toKebabCase = n =>
    n.replace(/Case$/, '').replace(/([a-z])([A-Z])/g, (match, c1, c2) => `${c1}-${c2.toLowerCase()}`);

export const pad = (n) => {
    const titleLength = 30;
    const p = '====================';
    const title = `${p} ${n} ${p}`;
    const offset = (title.length - titleLength) / 2;
    return title.substr(offset, titleLength);
};

export const OUTPUT = './output/';

export const createOutputDir = (testName) => {
    const outputDir = OUTPUT + testName;
    if (!fs.existsSync(OUTPUT)) {
        fs.mkdirSync(OUTPUT);
    }
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    return outputDir;
};

// Adds a dot to class names of a stylesheet,
// because some processors need that to distinguish from tag names.
export const toClassSelectors = styles =>
    Object.keys(styles).reduce((ss, className) => {
        ss[`.${className}`] = styles[className];
        return ss;
    }, {});

// Maps the original class names to the decorated / generated ones
export const mapClassNames = (styles, processor) =>
    Object.keys(styles).reduce((cnl, className) => {
        if (className !== '$globals$') {
            cnl[className] = processor(className);
        }
        return cnl;
    }, {});

// Runs each style object through the function processing them into real CSS
export const mapStyles = (styles, processor, prefixer) => {
    if (!prefixer) {
        prefixer = x => x;
    }
    const css = Object.keys(styles).reduce((ss, className) => {
        if (className !== '$globals$') {
            ss[className] = processor(prefixer(styles[className]));
        }
        return ss;
    }, {});
    return css;
};

// Transform given style object to CSS (for globals)
export const processStyles = (styles, prefixer) => {
    if (!prefixer) {
        prefixer = x => x;
    }
    const css = [];
    function process(style) {
        return Object.keys(style).forEach((property) => {
            const propertyName = toKebabCase(property);
            const rule = style[property];
            if (typeof rule === 'object') {
                rule.forEach((r) => { css.push(`${propertyName}: ${r};`); });
            } else {
                css.push(`${propertyName}: ${rule};`);
            }
        });
    }
    Object.keys(styles).forEach((selector) => { css.push(`${selector} {`); process(prefixer(styles[selector])); css.push('}'); });
    return css.join('\n');
};
