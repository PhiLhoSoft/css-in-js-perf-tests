import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true };
const styleSheet = createStyleSheet(options);

export const jssCase = (caseName) => {
    const jss = create(preset());
    const sheets = new SheetsRegistry();

    const jssCss = jss.createStyleSheet(styleSheet).attach();

    const html = renderBody(caseName, jssCss.classes.container, jssCss.classes.button);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
