import { create, SheetsRegistry } from 'jss';
import cache from 'jss-cache';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true };
const styleSheet = createStyleSheet(options);


export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    const sheets = new SheetsRegistry();

    const jssCss = jss.createStyleSheet(styleSheet).attach();

    const html = renderBody(caseName, jssCss.classes.container, jssCss.classes.button);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
