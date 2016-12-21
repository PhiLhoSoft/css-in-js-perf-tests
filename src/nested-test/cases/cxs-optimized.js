import cxs from 'cxs/optimized';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const cxsOptimizedCase = (caseName) => {
    const html = renderBody(caseName, cxs(styleSheet.container), cxs(styleSheet.button));

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
