import { MEDIA_MAX_WIDTH, p, s } from './appStyles';

const createComponentStyle = (options) => {
    const container = {
        backgroundColor: 'seashell',
        color: 'navy',
        fontSize: '24px',
        padding: '10px',
        [`${p(options)}:hover`]: { backgroundColor: 'moccassin' },
    };

    if (options && options.nestedSelectors !== undefined) {
        container[`${options.nestedSelectors}span`] = { margin: '0 20px 0 30px' };
        container[`${options.nestedSelectors}button`] = { marginLeft: '30px' };

        let special = `${options.nestedSelectors}&.special`.replace(/& &/, '&'); // JSS
        if (options.classNamesWithSelector === 'cssobj') {
            special = '&.!special';
        } else if (options.classNamesWithSelector === 'j2c') {
            special = ':global(.special)';
        }
        container[special] = { backgroundColor: 'tan' };
    }
    return container;
};

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
        cursor: 'grab', // Need prefix for webkit
        [`${p(options)}:hover`]: { color: 'orange' },
    };
};

export default function createStyleSheet(options) {
    return {
        [`${s(options)}container`]: createComponentStyle(options),
        [`${s(options)}button`]: createButtonStyle(options),
    };
}
