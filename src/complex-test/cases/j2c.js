import j2c from 'j2c';

import { toClassSelectors, mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const j2cCase = (caseName) => {
    const options = { prefixPseudo: true };
    const styleSheet = createStyleSheet(options);
    const css = j2c.sheet(toClassSelectors(styleSheet));

    const html = renderBody(caseName, mapClassNames(styleSheet, k => css[k]), appData);

    return renderHtml(css, html);
};
