import { create, SheetsRegistry } from 'jss';
import camelCase from 'jss-camel-case';
import { stylesheet, buttonClassNames } from '../styles';
import { renderHtml, renderBody } from '../render';

export const jssWithoutPresetCase = (caseName) => {
    const jss = create();
    const sheets = new SheetsRegistry();
    jss.use(camelCase());

    const jssCss = jss.createStyleSheet(stylesheet).attach();

    const getButtonClassName = i => jssCss.classes[buttonClassNames[i]];

    const html = renderBody(caseName, jssCss.classes.container, getButtonClassName);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
