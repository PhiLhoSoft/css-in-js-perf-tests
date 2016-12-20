import FreeStyle from 'free-style';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const freeStyleCase = (caseName) => {
    const Style = FreeStyle.create();

    const options = { prefixPseudo: true };
    const styleSheet = createStyleSheet(options);
    const classNames = mapClassNames(styleSheet, className => Style.registerStyle(styleSheet[className]));
    const html = renderBody(caseName, classNames, appData);

    const css = Style.getStyles();

    return renderHtml(css, html);
};
