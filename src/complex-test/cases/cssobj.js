// See simple-test for details
import cssobjCore from 'cssobj-core';
import cssobjPluginLocalize from 'cssobj-plugin-localize';
import cssobjPluginGencss from 'cssobj-plugin-gencss';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true, classNamesWithSelector: true, nestedSelectors: ' ' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);
// Same stylesheets but with undercorated class names (no dot)
const classNamesA = createAppStyleSheet();
const classNamesC = createComponentStyleSheet();

export const cssobjCase = (caseName) => {
    const cssobjOptions = {
        plugins: [
            cssobjPluginLocalize(),
            cssobjPluginGencss({ indent: '\t', newLine: '\n' }),
        ]
    };
    const cssobj = cssobjCore(cssobjOptions);

    const cssObjectA = cssobj(styleSheetA);
    const cssObjectC = cssobj(styleSheetC);

    const renderingData = {
        app: { classNames: mapClassNames(classNamesA, cssObjectA.mapClass) },
        item: {
            classNames: mapClassNames(classNamesC, cssObjectC.mapClass),
            renderComponent: renderItemComponent,
        },
    };
    const html = renderBody(caseName, appData, renderingData);

    const css = cssObjectA.css + cssObjectC.css;

    return renderHtml(css, html);
};
