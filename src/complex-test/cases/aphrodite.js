import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const aphroditeCase = (caseName) => {
    const styleSheet = StyleSheet.create(createStyleSheet());

    const { html, css } = StyleSheetServer.renderStatic(() => {
        const classNames = mapClassNames(styleSheet, className => aphroditeCss(styleSheet[className]));
        return renderBody(caseName, classNames, appData);
    });

    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();

    return renderHtml(css.content, html);
};
