import cxs from 'cxs';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const cxsCase = (caseName) => {
    const html = renderBody(caseName, cxs(styleSheet.container), cxs(styleSheet.button));

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
