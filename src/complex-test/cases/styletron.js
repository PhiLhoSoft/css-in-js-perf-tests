import Styletron from 'styletron-server';
import { injectStylePrefixed } from 'styletron-utils';

import { mapStyles, mapClassNames, processStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

// Similar to CXS way
function processGlobals(styles, process) {
    Object.keys(styles.$globals$).forEach((selector) => {
        process(selector, styles.$globals$[selector]);
    });
}

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const styletronCase = (caseName) => {
    const styletron = new Styletron();

    const process = injectStylePrefixed.bind(null, styletron);
    // processGlobals(styleSheetA, process);
    const cssA = mapStyles(styleSheetA, process);
    const cssC = mapStyles(styleSheetC, process);
    const renderingData = {
        app: { classNames: mapClassNames(cssA, className => cssA[className]) },
        item: {
            classNames: mapClassNames(cssC, className => cssC[className]),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = processStyles(styleSheetA.$globals$) + '\n' + styletron.getCss();

    return renderHtml(css, html);
};
