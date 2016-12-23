import j2c from 'j2c';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true, classNamesWithSelector: true, nestedSelectors: ' ' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const j2cCase = (caseName) => {
    // Strings with additional properties...
    const cssA = j2c.sheet(styleSheetA);
    const cssC = j2c.sheet(styleSheetC);

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
