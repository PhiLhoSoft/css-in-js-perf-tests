// Render a component named (imaginatively) "item".
export const renderItemComponent = (index, appData, classNames) =>
`<div class="${classNames.container} ${appData.items[index].classNames}">
    <span>${appData.items[index].name}</span>
    <input type="checkbox" value="${appData.items[index].value}" ${appData.items[index].disabled ? 'checked' : ''}>Disable</input>
    <button class="${classNames.button}">x</button>
</div>`;
