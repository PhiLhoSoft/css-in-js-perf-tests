import { create, SheetsRegistry } from 'jss';
import cache from 'jss-cache';
import global from 'jss-global';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
// import vendorPrefixer from 'jss-vendor-prefixer';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames, prefixStylesWithFallbacks } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const cachePlugin = cache();
const globalPlugin = global();
const nestedPlugin = nested();
const camelCasePlugin = camelCase();

const options = { prefixPseudo: true, nestedSelectors: '& ' };

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    jss.use(cachePlugin, globalPlugin, nestedPlugin, camelCasePlugin);
    // jss.use(vendorPrefixer()); // But actually doesn't work on server side :-/
    const sheets = new SheetsRegistry();

    const styleSheetA = createAppStyleSheet(options);
    const styleSheetC = createComponentStyleSheet(options);
    console.log(styleSheetC);

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
    const css = sheets.toString();

    return renderHtml(css, html);
};
