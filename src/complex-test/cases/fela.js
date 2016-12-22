import { createRenderer } from 'fela';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

function processGlobals(styles, renderer) {
    Object.keys(styles.$globals$).forEach((tagName) => {
        renderer.renderStatic(styles.$globals$[tagName], tagName);
    });
}

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const felaCase = (caseName) => {
    const renderer = createRenderer();
    processGlobals(styleSheetA, renderer);

    const renderingData = {
        app: { classNames: mapClassNames(styleSheetA, className => renderer.renderRule(() => styleSheetA[className])) },
        item: {
            classNames: mapClassNames(styleSheetC, className => renderer.renderRule(() => styleSheetC[className])),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = renderer.renderToString();

    return renderHtml(css, html);
};
