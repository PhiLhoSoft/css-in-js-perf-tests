import { renderStatic } from 'glamor/server';
import { style, flush } from 'glamor';
import { createContainerStyle, createButtonStyle } from '../styles';
import { renderHtml, renderBody } from '../render';

export const glamorCase = (caseName) => {
    const { html, css } = renderStatic(() =>
        renderBody(
            caseName, {
                container: style(createContainerStyle()),
                button: style(createButtonStyle()),
            }
        )
    );

    flush();

    return renderHtml(css, html);
};
