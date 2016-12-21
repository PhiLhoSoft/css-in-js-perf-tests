import { create } from 'jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    jss.use(nested());
    jss.use(camelCase());

    const cssA = jss.createStyleSheet(styleSheetA).attach();
    const cssC = jss.createStyleSheet(styleSheetC).attach();
    const renderingData = {
        app: { classNames: mapClassNames(cssA.classes, className => cssA.classes[className]) },
        item: {
            classNames: mapClassNames(cssC.classes, className => cssC.classes[className]),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = jss.sheets.toString();

    return renderHtml(css, html);
};
