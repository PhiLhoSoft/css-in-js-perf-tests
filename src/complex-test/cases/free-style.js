import FreeStyle from 'free-style';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

function processGlobals(styles, Style) {
    Object.keys(styles.$globals$).forEach((selector) => {
        Style.registerRule(selector, prefixer(styles.$globals$[selector]));
    });
}

const options = { prefixPseudo: true, nestedSelectors: '' };

export const freeStyleCase = (caseName) => {
    const Style = FreeStyle.create();

    const styleSheetA = createAppStyleSheet(options);
    const styleSheetC = createComponentStyleSheet(options);

    processGlobals(styleSheetA, Style);
    // Can add class name as shown to keep the original name for debugging purpose.
    const renderingData = {
        app: { classNames: mapClassNames(styleSheetA, className => Style.registerStyle(prefixer(styleSheetA[className])/*, className*/)) },
        item: {
            classNames: mapClassNames(styleSheetC, className => Style.registerStyle(prefixer(styleSheetC[className])/*, className*/)),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = Style.getStyles();

    return renderHtml(css, html);
};
