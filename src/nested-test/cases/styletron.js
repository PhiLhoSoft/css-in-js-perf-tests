import Styletron from 'styletron-server';
import { injectStyle } from 'styletron-utils';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const styletronCase = (caseName) => {
    const styletron = new Styletron();

    const html = renderBody(
        caseName,
        injectStyle(styletron, styleSheet.container),
        injectStyle(styletron, styleSheet.button)
    );

    const css = styletron.getCss();

    return renderHtml(css, html);
};
