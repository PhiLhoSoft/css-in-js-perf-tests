// See simple-test for details
import cssobjCore from 'cssobj-core';
import cssobjPluginLocalize from 'cssobj-plugin-localize';
import cssobjPluginGencss from 'cssobj-plugin-gencss';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames, mapStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true, classNamesWithSelector: 'cssobj', nestedSelectors: ' ' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);
// Same stylesheets but with undercorated class names (no dot)
const classNamesA = createAppStyleSheet();
const classNamesC = createComponentStyleSheet();

export const cssobjCase = (caseName) => {
    const localA = cssobjPluginLocalize();
    const localC = cssobjPluginLocalize(); // Needs 2 instances
    const genCss = cssobjPluginGencss({ indent: '\t', newLine: '\n' });

    const cssobjA = cssobjCore({ plugins: [ localA, genCss ] });
    const cssobjC = cssobjCore({ plugins: [ localC, genCss ] });

    // To be fair, we apply auto-prefixing in the loop, like the other libraries.
    // We focus on features more than speed in this test case, anyway.
    const ssA = mapStyles(styleSheetA, prefixer);
    const ssC = mapStyles(styleSheetC, prefixer);
    const cssObjectA = cssobjA(ssA);
    const cssObjectC = cssobjC(ssC);

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
