import { MEDIA_MAX_WIDTH, p, s } from './appStyles';

const createComponentStyle = options => ({
    backgroundColor: 'seashell',
    color: 'navy',
    fontSize: '18px',
    padding: '10px',
    [`${p(options)}:hover`]: { backgroundColor: 'moccassin' },
});

const createButtonStyle = (options) => {
    const buttonSize = '30px';
    return {
        backgroundColor: 'red',
        color: 'yellow',
        fontSize: '24px',
        border: 'none',
        width: buttonSize,
        height: buttonSize,
        borderRadius: '50%',
        [`${p(options)}:hover`]: { color: 'orange' },
    };
};

export default function createStyleSheet(options) {
    return {
        [`${s(options)}container`]: createComponentStyle(options),
        [`${s(options)}button`]: createButtonStyle(options),
    };
}
