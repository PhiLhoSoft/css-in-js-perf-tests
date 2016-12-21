import Styletron from 'styletron-server';
import { injectStyle } from 'styletron-utils';

import { mapStyles, mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const styletronCase = (caseName) => {
    const styletron = new Styletron();

    const process = injectStyle.bind(null, styletron);
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

    const css = styletron.getCss();

    return renderHtml(css, html);
};
