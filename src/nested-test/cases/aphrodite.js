import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite';

import { createStyleSheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const styleSheet = createStyleSheet();

export const aphroditeCase = (caseName) => {
    const useStyles = StyleSheet.create(styleSheet);

    const { html, css } = StyleSheetServer.renderStatic(() =>
        renderBody(
            caseName,
            aphroditeCss(useStyles.container),
            aphroditeCss(useStyles.button)
        )
    );

    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();

    return renderHtml(css.content, html);
};
