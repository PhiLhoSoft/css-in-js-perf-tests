import FreeStyle from 'free-style';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true };
const styleSheet = createStyleSheet(options);

export const freeStyleCase = (caseName) => {
    const Style = FreeStyle.create();

    const html = renderBody(
        caseName,
        Style.registerStyle(styleSheet.container),
        Style.registerStyle(styleSheet.button)
    );

    const css = Style.getStyles();

    return renderHtml(css, html);
};
