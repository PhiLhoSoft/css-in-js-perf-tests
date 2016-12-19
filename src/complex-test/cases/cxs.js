import cxs from 'cxs';
import { createContainerStyle, createButtonStyle } from '../styles';
import { renderHtml, renderBody } from '../render';

export const cxsCase = (caseName) => {
    const html = renderBody(
        caseName, {
            container: cxs(createContainerStyle()),
            button: cxs(createButtonStyle()),
        }
    );

    const { css } = cxs;

    cxs.reset();

    return renderHtml(css, html);
};
