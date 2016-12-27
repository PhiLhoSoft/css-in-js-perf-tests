import fs from 'fs';

export const toKebabCase = n =>
    n.replace(/([A-Z])/g, (match, c1) => `-${c1.toLowerCase()}`);

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

// inline-style-prefixer provides fallbacks in arrays as values,
// but JSS puts them in a special "fallbacks" property, in addition to the canonical value.
// So this code walks the style object recursively and when it meets an array as value,
// it replaces it with the last value of the array and adds the remainder in the "fallbacks" property.
// This works only for our simple test cases, it is not robust enough for general cases.
// For this, one would rather hack the jss-vendor-prefixer plugin to work on the server side...
export const prefixStylesWithFallbacks = (styles, prefixer) => {
    // For each property of the style, prefixes its style.
    const css = Object.keys(styles).reduce((ss, className) => {
        ss[className] = prefixer(styles[className]);
        return ss;
    }, {});

    function arrayToFallback(obj) {
        Object.keys(obj).forEach((k) => {
            if (Array.isArray(obj[k])) {
                if (!Array.isArray(obj.fallbacks)) {
                    obj.fallbacks = [];
                }
                const array = obj[k];
                const value = array.pop();
                array.forEach((v) => {
                    obj.fallbacks.push({ [k]: v });
                });
                obj[k] = value;
            } else if (typeof obj[k] === 'object') {
                arrayToFallback(obj[k]);
            }
        });

        return obj;
    }

    // Examine each property and if it is an object, proceed recursively, or if it is an array, process the fallbacks.
    return arrayToFallback(css);
};
