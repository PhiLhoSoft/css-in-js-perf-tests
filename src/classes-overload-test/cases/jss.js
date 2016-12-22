import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { stylesheet, buttonClassNames } from '../styles';
import { renderHtml, renderBody } from '../render';

export const jssCase = (caseName) => {
    const jss = create(preset());
    const sheets = new SheetsRegistry();

    const jssCss = jss.createStyleSheet(stylesheet).attach();

    const getButtonClassName = i => jssCss.classes[buttonClassNames[i]];

    const html = renderBody(caseName, jssCss.classes.container, getButtonClassName);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
