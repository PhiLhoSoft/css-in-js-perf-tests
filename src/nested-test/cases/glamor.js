import { renderStatic } from 'glamor/server';
import { style, flush } from 'glamor';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const glamorCase = (caseName) => {
    const { html, css } = renderStatic(() =>
        renderBody(caseName, style(styleSheet.container), style(styleSheet.button))
    );

    flush();

    return renderHtml(css, html);
};
