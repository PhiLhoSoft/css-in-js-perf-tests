import { ExtendedStyleSheet as Extended } from './aphrodite-extensions';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { bangGlobals: true };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const aphroditeCase = (caseName) => {
    const cssA = Extended.StyleSheet.create(styleSheetA);
    const cssC = Extended.StyleSheet.create(styleSheetC);

    // Everything must be done within the renderStatic call
    const { html, css } = Extended.StyleSheetServer.renderStatic(() => {
        const renderingData = {
            app: { classNames: mapClassNames(cssA, className => Extended.css(cssA[className])) },
            item: {
                classNames: mapClassNames(cssC, className => Extended.css(cssC[className])),
                renderComponent: renderItemComponent,
            },
        };
        return renderBody(caseName, appData, renderingData);
    });

    Extended.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();

    return renderHtml(css.content, html);
};
