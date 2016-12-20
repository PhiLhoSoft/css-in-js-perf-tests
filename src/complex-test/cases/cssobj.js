// See simple-test for details
import cssobjCore from 'cssobj-core';
import cssobjPluginLocalize from 'cssobj-plugin-localize';
import cssobjPluginGencss from 'cssobj-plugin-gencss';

import { toClassSelectors, mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const cssobjCase = (caseName) => {
    const cssobj = cssobjCore({
        local: true,
        plugins: [
            cssobjPluginLocalize(),
            cssobjPluginGencss({ indent: '\t', newLine: '\n' }),
        ]
    });
    const options = { prefixPseudo: true };
    const styleSheet = createStyleSheet(options);
    const cssObject = cssobj(toClassSelectors(styleSheet));

    const html = renderBody(caseName, mapClassNames(styleSheet, cssObject.mapClass), appData);

    return renderHtml(cssObject.css, html);
};
