import FreeStyle from 'free-style';
import prefixer from 'inline-style-prefixer/static';

import { mapClassNames, processStyles } from '../../utilities';
import appData from '../data';
import createAppStyleSheet from '../appStyles';
import createComponentStyleSheet from '../componentStyles';
import { renderHtml, renderBody } from '../render';
import { renderItemComponent } from '../renderItemComponent';

const options = { prefixPseudo: true };

export const freeStyleCase = (caseName) => {
    const Style = FreeStyle.create();

    const styleSheetA = createAppStyleSheet(options);
    const styleSheetC = createComponentStyleSheet(options);

    const renderingData = {
        app: { classNames: mapClassNames(styleSheetA, className => Style.registerStyle(prefixer(styleSheetA[className]))) },
        item: {
            classNames: mapClassNames(styleSheetC, className => Style.registerStyle(prefixer(styleSheetC[className]))),
            renderComponent: renderItemComponent,
        },
    };

    const html = renderBody(caseName, appData, renderingData);

    const css = processStyles(styleSheetA.$globals$, prefixer) + '\n' + Style.getStyles();

    return renderHtml(css, html);
};
