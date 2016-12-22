import FreeStyle from 'free-style';

import { mapClassNames, processStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true };
const styleSheetA = createAppStyleSheet(options);
const styleSheetC = createComponentStyleSheet(options);

export const freeStyleCase = (caseName) => {
    const Style = FreeStyle.create();

    const renderingData = {
        app: { classNames: mapClassNames(styleSheetA, className => Style.registerStyle(styleSheetA[className])) },
        item: {
            classNames: mapClassNames(styleSheetC, className => Style.registerStyle(styleSheetC[className])),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = processStyles(styleSheetA.$globals$) + '\n' + Style.getStyles();

    return renderHtml(css, html);
};
