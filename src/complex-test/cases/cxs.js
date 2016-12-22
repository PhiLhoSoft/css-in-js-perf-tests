import cxs from 'cxs';

import { mapStyles, mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

function processGlobals(styles) {
    Object.keys(styles.$globals$).forEach((selector) => {
        cxs(selector, styles.$globals$[selector]);
    });
}

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const cxsCase = (caseName) => {
    processGlobals(styleSheetA);
    const cssA = mapStyles(styleSheetA, cxs);
    const cssC = mapStyles(styleSheetC, cxs);

    const renderingData = {
        app: { classNames: mapClassNames(cssA, className => cssA[className]) },
        item: {
            classNames: mapClassNames(cssC, className => cssC[className]),
            renderComponent: renderItemComponent,
        },
    };
    const html = renderBody(caseName, appData, renderingData);

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
