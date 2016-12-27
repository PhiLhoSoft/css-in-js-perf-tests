import j2c from 'j2c';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames, mapStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet, { MEDIA_MAX_WIDTH } from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

// Hack because style prefixer adds properties after the media rule.
function moveMediaToEnd(style) {
    Object.keys(style).forEach((selector) => {
        const rule = style[selector];
        const media = rule[MEDIA_MAX_WIDTH];
        if (media) {
            delete rule[MEDIA_MAX_WIDTH];
            rule[MEDIA_MAX_WIDTH] = media;
        }
    });
}

const options = { prefixPseudo: true, classNamesWithSelector: 'j2c', nestedSelectors: ' ' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const j2cCase = (caseName) => {
    // To be fair, we apply auto-prefixing in the loop, like the other libraries.
    // We focus on features more than speed in this test case, anyway.
    const ssA = mapStyles(styleSheetA, prefixer);
    moveMediaToEnd(ssA);
    const ssC = mapStyles(styleSheetC, prefixer);
    moveMediaToEnd(ssC);
    // These are strings with additional properties...
    const cssA = j2c.sheet(ssA);
    const cssC = j2c.sheet(ssC);

    const renderingData = {
        app: { classNames: mapClassNames(cssA, className => cssA[className]) },
        item: {
            classNames: mapClassNames(cssC, className => cssC[className]),
            renderComponent: renderItemComponent,
        },
    };

    const css = cssA + cssC;

    const html = renderBody(caseName, appData, renderingData);

    return renderHtml(css, html);
};
