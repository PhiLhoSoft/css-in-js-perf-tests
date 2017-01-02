export const renderHtml = (css, body) =>
// We must specify the doc type to avoid the quicks mode where class names are case insensitive, which messes Fela rendering (i vs. I for example).
`<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">/* Styles of the fake library */
.container { background-color: red; padding: 16px; }
.container .counter { margin: 0 20px; padding: 4px; background-color: blue; color: white; }
.container .button { padding: 4px 8px; background-color: darkblue; color: white; font-weight: bold; }
        </style>
        <style type="text/css">
${css}
        </style>
    </head>
    <body>
${body}
    </body>
</html>
`;

function renderComponentList(componentName, componentNumber, appData, renderingData) {
    const components = [];

    for (let i = 0; i < componentNumber; i++) {
        components.push(renderingData[componentName].renderComponent(i, appData, renderingData[componentName].classNames));
    }

    return components.join('\n');
}

// renderingData: class names and rendering functions for the app and each component
export const renderBody = (libraryName, appData, renderingData) =>
`<header class="${renderingData.app.classNames.top}">
    <h1>${libraryName}</h1>
</header>
<div class="${renderingData.app.classNames.container}">
    <section class="${renderingData.app.classNames.itemContainer}">
        <header class="${renderingData.app.classNames.title}">
            <h2>Main app</h2>
        </header>
${renderComponentList('item', appData.itemNumber, appData, renderingData)}
        <button class="${renderingData.app.classNames.button}">Update</button>
    </section>
    <div class="${renderingData.app.classNames.sideContainer}">
        <aside class="${renderingData.app.classNames.help}">
            <header class="${renderingData.app.classNames.title}">
                <h2>Help</h2>
            </header>
            <p>There is a main section.</p>
            <p>And, beside this one which provides a succint help, there is also an aside controlled by a library. This paragraph is long enough to wrap...</p>
        </aside>
        <aside class="${renderingData.app.classNames.libraryContainer}">
            <header class="${renderingData.app.classNames.title}">
                <h2>3rd Party Library</h2>
            </header>
            <!-- Code generated by the library -->
            <div class="container">
                <span class="counter">101</span>
                <button class="button">Increment</button>
            </div>
        </aside>
    </div>
</div>
<footer class="${renderingData.app.classNames.bottom}">
    <small>The CSS-in-JS Performance Test</small>
</footer>`;
