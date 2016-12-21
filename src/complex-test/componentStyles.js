import { MEDIA_MAX_WIDTH, p, s } from './appStyles';

const createComponentStyle = options => ({
    backgroundColor: 'seashell',
    color: 'navy',
    fontSize: '18px',
    [`${p(options)}:hover`]: { backgroundColor: 'moccassin' },
});

const createButtonStyle = options => ({
    backgroundColor: 'red',
    color: 'yellow',
    fontSize: '24px',
    border: 'none',
    width: '30px',
    height: '30px',
    [`${p(options)}:hover`]: { color: 'orange' },
});

export default function createStyleSheet(options) {
    return {
        [`${s(options)}container`]: createComponentStyle(options),
        [`${s(options)}button`]: createButtonStyle(options),
    };
}
