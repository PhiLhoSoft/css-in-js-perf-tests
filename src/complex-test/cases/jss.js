import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default'; // Includes jss-vendor-prefixer but it doesn't work on the server side.
import cache from 'jss-cache';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames, prefixStylesWithFallbacks } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const settings = preset();
settings.plugins.unshift(cache());

const options = { prefixPseudo: true, nestedSelectors: '@global ' };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const jssCase = (caseName) => {
    const jss = create(settings);
    const sheets = new SheetsRegistry();

    const ssA = prefixStylesWithFallbacks(styleSheetA, prefixer);
    const ssC = prefixStylesWithFallbacks(styleSheetC, prefixer);

    const cssG = jss.createStyleSheet({ '@global': ssA.$globals$ }).attach();
    const cssA = jss.createStyleSheet(ssA).attach();
    const cssC = jss.createStyleSheet(ssC).attach();
    const renderingData = {
        app: { classNames: mapClassNames(cssA.classes, className => cssA.classes[className]) },
        item: {
            classNames: mapClassNames(cssC.classes, className => cssC.classes[className]),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    sheets.add(cssG);
    sheets.add(cssA);
    sheets.add(cssC);
    // Hack to have adjacent class names, like "".foo.bar" instead of ".foo .bar" (marked as ".foo &.bar")
    const css = sheets.toString().replace(/ &\./g, '.');

    return renderHtml(css, html);
};
