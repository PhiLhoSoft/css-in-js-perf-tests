import cxs from 'cxs/optimized';

import { mapStyles, mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const cxsOptimizedCase = (caseName) => {
    const styleSheet = mapStyles(createStyleSheet(), cxs);
    const html = renderBody(caseName, mapClassNames(styleSheet, k => styleSheet[k]), appData);

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
