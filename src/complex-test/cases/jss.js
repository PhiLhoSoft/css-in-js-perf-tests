import { create } from 'jss';
import preset from 'jss-preset-default';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const jssCase = (caseName) => {
    const jss = create(preset());

    const options = { prefixPseudo: true };
    const styleSheet = jss.createStyleSheet(createStyleSheet(options)).attach();

    const html = renderBody(caseName, mapClassNames(styleSheet.classes, k => styleSheet.classes[k]), appData);

    const css = jss.sheets.toString();

    return renderHtml(css, html);
};
