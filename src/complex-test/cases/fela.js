import { createRenderer } from 'fela';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const felaCase = (caseName) => {
    const renderer = createRenderer();

    const styleSheet = createStyleSheet();
    const classNames = mapClassNames(styleSheet, className => renderer.renderRule(() => styleSheet[className]));

    const html = renderBody(caseName, classNames, appData);

    const css = renderer.renderToString();

    return renderHtml(css, html);
};
