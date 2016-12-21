import j2c from 'j2c';

import { toClassSelectors } from '../../utilities';
import { stylesheet, buttonClassNames } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = toClassSelectors(stylesheet);

export const j2cCase = (caseName) => {
    const css = j2c.sheet(styleSheet);

    const getButtonClassName = i => css[buttonClassNames[i]];

    const html = renderBody(caseName, css.container, getButtonClassName);

    return renderHtml(css, html);
};
