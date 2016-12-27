// See simple-test for details
import cssobjCore from 'cssobj-core';
import cssobjPluginLocalize from 'cssobj-plugin-localize';
import cssobjPluginGencss from 'cssobj-plugin-gencss';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const options = { prefixPseudo: true, classNamesWithSelector: true };
const styleSheet = createStyleSheet(options);

export const cssobjCase = (caseName) => {
    const cssobj = cssobjCore({
        plugins: [
            cssobjPluginLocalize(),
            cssobjPluginGencss({ indent: '\t', newLine: '\n' }),
        ]
    });
    const cssObject = cssobj(styleSheet);

    const html = renderBody(caseName, cssObject.mapClass('container'), cssObject.mapClass('button'));

    return renderHtml(cssObject.css, html);
};
