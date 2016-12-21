import j2c from 'j2c';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true, classNamesWithSelector: true };
const styleSheet = createStyleSheet(options);

export const j2cCase = (caseName) => {
    const css = j2c.sheet(styleSheet);

    const html = renderBody(caseName, css.container, css.button);

    return renderHtml(css, html);
};
