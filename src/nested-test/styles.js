const MEDIA_MAX_HEIGHT = '@media (max-height: 400px)';

// Some libraries like free-style require to write '&:hover',
// others accept either form, others choke on it...
export function p(o) { return o && o.prefixPseudo ? '&' : ''; }
// Likewise, some libraries distinguish tag names from class selectors, thus need an initial dot.
// Of course, these are only adaptors to make the style sheets library agnostic, these tricks are not necessary in real code.
export function s(o) { return o && o.classNamesWithSelector ? '.' : ''; }

const createContainerStyle = (options) => {
    return {
        color: 'yellow',
        display: 'block',
        backgroundColor: 'blue',
        textAlign: 'center',
        padding: '30px',
        fontSize: '50px',
        [`${p(options)}:hover`]: { backgroundColor: 'darkturquoise' },
        [MEDIA_MAX_HEIGHT]: {
            backgroundColor: 'deepskyblue',
            textAlign: 'left',
            padding: '20px',
            fontSize: '25px',
            [`${p(options)}:hover`]: { backgroundColor: 'turquoise' },
        },
    };
};

const createButtonStyle = (options) => {
    return {
        color: 'yellow',
        display: 'block',
        backgroundColor: 'rebeccapurple',
        fontSize: '30px',
        border: '3px solid yellow',
        [`${p(options)}:hover`]: {
            color: 'lightblue',
            [`${p(options)}:active`]: {
                fontSize: '24px',
                color: 'red',
            },
        },
        [MEDIA_MAX_HEIGHT]: {
            color: 'lightgreen',
            fontSize: '24px',
            [`${p(options)}:hover:active`]: {
                fontSize: '18px',
            },
        },
    };
};

export const createStyleSheet = options => ({
    [`${s(options)}container`]: createContainerStyle(options),
    [`${s(options)}button`]: createButtonStyle(options),
});
