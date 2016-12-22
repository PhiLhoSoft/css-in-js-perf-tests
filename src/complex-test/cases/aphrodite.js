import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite';

import { mapClassNames, processStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const styleSheetA = createAppStyleSheet();
const styleSheetC = createComponentStyleSheet();

export const aphroditeCase = (caseName) => {
    const cssA = StyleSheet.create(styleSheetA);
    const cssC = StyleSheet.create(styleSheetC);

    // Everything must be done within the renderStatic call
    const { html, css } = StyleSheetServer.renderStatic(() => {
        const renderingData = {
            app: { classNames: mapClassNames(cssA, className => aphroditeCss(cssA[className])) },
            item: {
                classNames: mapClassNames(cssC, className => aphroditeCss(cssC[className])),
                renderComponent: renderItemComponent,
            },
        };
        return renderBody(caseName, appData, renderingData);
    });

    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();

    return renderHtml(processStyles(styleSheetA.$globals$) + '\n' + css.content, html);
};
