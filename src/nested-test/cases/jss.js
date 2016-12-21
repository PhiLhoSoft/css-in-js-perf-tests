import { create } from 'jss';
import preset from 'jss-preset-default';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true };
const styleSheet = createStyleSheet(options);

export const jssCase = (caseName) => {
    const jss = create(preset());

    const { classes: { container, button } } = jss.createStyleSheet(styleSheet).attach();

    const html = renderBody(caseName, container, button);

    const css = jss.sheets.toString();

    return renderHtml(css, html);
};
