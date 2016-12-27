import cxs from 'cxs';
import prefixer from 'inline-style-prefixer/static';

import { mapStyles, mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

function processGlobals(styles) {
    Object.keys(styles.$globals$).forEach((selector) => {
        cxs(selector, prefixer(styles.$globals$[selector]));
    });
}

const options = { nestedSelectors: '' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const cxsCase = (caseName) => {
    processGlobals(styleSheetA);
    const mappedClassNamesA = mapStyles(styleSheetA, cxs, prefixer);
    const mappedClassNamesC = mapStyles(styleSheetC, cxs, prefixer);

    const renderingData = {
        app: { classNames: mapClassNames(mappedClassNamesA, className => mappedClassNamesA[className]) },
        item: {
            classNames: mapClassNames(mappedClassNamesC, className => mappedClassNamesC[className]),
            renderComponent: renderItemComponent,
        },
    };
    const html = renderBody(caseName, appData, renderingData);

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
