import { createRenderer } from 'fela';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const felaCase = (caseName) => {
    const renderer = createRenderer();

    const html = renderBody(
        caseName,
        renderer.renderRule(() => styleSheet.container),
        renderer.renderRule(() => styleSheet.button)
    );

    const css = renderer.renderToString();

    return renderHtml(css, html);
};
