import { renderStatic } from 'glamor/server';
import { style, flush } from 'glamor';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

function processGlobals(styles) {
    Object.keys(styles.$globals$).forEach((selector) => {
        style.global(selector, styles.$globals$[selector]);
    });
}

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const glamorCase = (caseName) => {
    // Everything must be done within the renderStatic call
    const { html, css } = renderStatic(() => {
        processGlobals(styleSheetA);
        const renderingData = {
            app: { classNames: mapClassNames(styleSheetA, className => style(styleSheetA[className])) },
            item: {
                classNames: mapClassNames(styleSheetC, className => style(styleSheetC[className])),
                renderComponent: renderItemComponent,
            },
        };
        return renderBody(caseName, appData, renderingData);
    });

    flush();

    return renderHtml(css, html);
};
