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

export const cxsCase = (caseName) => {
    const styleSheetA = createAppStyleSheet(options);
    const styleSheetC = createComponentStyleSheet(options);

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

    // Hack to have adjacent class names, like "".foo.bar" instead of ".foo .bar" (marked as ".foo &.bar")
    const css = cxs.css.replace(/ &\./g, '.');

    cxs.reset();

    return renderHtml(css, html);
};
