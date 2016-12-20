import { create } from 'jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';

import { mapClassNames } from '../../utilities';
import appData from '../data';
import createStyleSheet from '../styles';
import { renderHtml, renderBody } from '../render';

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    jss.use(nested());
    jss.use(camelCase());

    const options = { prefixPseudo: true };
    const styleSheet = jss.createStyleSheet(createStyleSheet(options)).attach();

    const html = renderBody(caseName, mapClassNames(styleSheet.classes, k => styleSheet.classes[k]), appData);

    const css = jss.sheets.toString();

    return renderHtml(css, html);
};
