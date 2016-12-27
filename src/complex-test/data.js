const itemNumber = process.env.ITERATIONS || 5;

const items = [];
for (let i = 0; i < itemNumber; i++) {
    const letter = String.fromCharCode(65 + i);
    items.push({ name: `Item ${letter}`, value: letter.toLowerCase(), disabled: false });
}
const spc1 = Math.floor(itemNumber / 3);
const spc2 = 2 * spc1;
items[spc1].classNames = 'special';
items[spc2].disabled = true;
items[spc2 + 1].classNames = 'special';

export default {
    itemNumber,
    items,
};
