import { create } from 'jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true };
const styleSheet = createStyleSheet(options);

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    jss.use(nested());
    jss.use(camelCase());

    const { classes: { container, button } } = jss.createStyleSheet(styleSheet).attach();

    const html = renderBody(caseName, container, button);

    const css = jss.sheets.toString();

    return renderHtml(css, html);
};
