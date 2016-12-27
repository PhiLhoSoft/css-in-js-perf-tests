import { create, SheetsRegistry } from 'jss';
import cache from 'jss-cache';
import camelCase from 'jss-camel-case';
import { stylesheet, buttonClassNames } from '../styles';
import { renderHtml, renderBody } from '../render';

const cachePlugin = cache();
const camelCasePlugin = camelCase();

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    jss.use(cachePlugin, camelCasePlugin);
    const sheets = new SheetsRegistry();

    const jssCss = jss.createStyleSheet(stylesheet).attach();

    const getButtonClassName = i => jssCss.classes[buttonClassNames[i]];

    const html = renderBody(caseName, jssCss.classes.container, getButtonClassName);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
