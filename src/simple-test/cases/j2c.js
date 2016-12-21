import j2c from 'j2c';

import { toClassSelectors } from '../../utilities';
import { stylesheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = toClassSelectors(stylesheet);

export const j2cCase = (caseName) => {
    const css = j2c.sheet(styleSheet);

    const html = renderBody(caseName, css.container, css.button);

    return renderHtml(css, html);
};
