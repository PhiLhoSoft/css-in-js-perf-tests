import { create, SheetsRegistry } from 'jss';
import cache from 'jss-cache';
import preset from 'jss-preset-default';
import { stylesheet } from '../styles';
import { renderHtml, renderBody } from '../render';

const settings = preset();
settings.plugins.unshift(cache());

export const jssCase = (caseName) => {
    const jss = create(settings);
    const sheets = new SheetsRegistry();

    const jssCss = jss.createStyleSheet(stylesheet).attach();

    const html = renderBody(caseName, jssCss.classes.container, jssCss.classes.button);

    sheets.add(jssCss);
    const css = sheets.toString();

    return renderHtml(css, html);
};
