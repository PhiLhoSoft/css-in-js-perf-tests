import Styletron from 'styletron-server';
import { injectStyle } from 'styletron-utils';

import { mapStyles, mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const styletronCase = (caseName) => {
    const styletron = new Styletron();
    const process = injectStyle.bind(null, styletron);
    const styleSheet = mapStyles(createStyleSheet(), process);

    const html = renderBody(caseName, mapClassNames(styleSheet, k => styleSheet[k]), appData);

    const css = styletron.getCss();

    return renderHtml(css, html);
};
