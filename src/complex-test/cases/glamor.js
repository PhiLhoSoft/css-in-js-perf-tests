import { renderStatic } from 'glamor/server';
import { style, flush } from 'glamor';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const glamorCase = (caseName) => {
    const styleSheet = createStyleSheet();

    const { html, css } = renderStatic(() => {
        const classNames = mapClassNames(styleSheet, className => style(styleSheet[className]));
        return renderBody(caseName, classNames, appData);
    });

    flush();

    return renderHtml(css, html);
};
