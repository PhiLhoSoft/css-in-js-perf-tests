//import cssobj from 'cssobj'; // In client
// For server-side rendering
import cssobjCore from 'cssobj-core';
import cssobjPluginLocalize from 'cssobj-plugin-localize';
import cssobjPluginGencss from 'cssobj-plugin-gencss';

import { toClassSelectors } from '../../utilities';
import { stylesheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = toClassSelectors(stylesheet);

export const cssobjCase = (caseName) => {
    const cssobj = cssobjCore({
        plugins: [
            // order is important
            cssobjPluginLocalize({ /*space: '_custom_', localNames: {}*/ }), // Don't customize the output, defaults to random suffix
            cssobjPluginGencss({ indent: '\t', newLine: '\n' }),
        ]
    });
    const cssObject = cssobj(styleSheet);

    const html = renderBody(caseName, cssObject.mapClass('container'), cssObject.mapClass('button'));

    return renderHtml(cssObject.css, html);
};
