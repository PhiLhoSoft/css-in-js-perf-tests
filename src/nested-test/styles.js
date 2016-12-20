const MEDIA_MAX_HEIGHT = '@media (max-height: 400px)';

export const createContainerStyle = (options) => {
    // Some libraries like free-style require to write '&:hover', others accept either form, others choke on it...
    const p = options && options.prefixPseudo ? '&' : '';
    return {
        color: 'yellow',
        display: 'block',
        backgroundColor: 'blue',
        textAlign: 'center',
        padding: '30px',
        fontSize: '50px',
        [`${p}:hover`]: { backgroundColor: 'darkturquoise' },
        [MEDIA_MAX_HEIGHT]: {
            backgroundColor: 'deepskyblue',
            textAlign: 'left',
            padding: '20px',
            fontSize: '25px',
            [`${p}:hover`]: { backgroundColor: 'turquoise' },
        },
    };
};

export const createButtonStyle = (options) => {
    const p = options && options.prefixPseudo ? '&' : '';
    return {
        color: 'yellow',
        display: 'block',
        backgroundColor: 'rebeccapurple',
        fontSize: '30px',
        border: '3px solid yellow',
        [`${p}:hover`]: {
            color: 'lightblue',
            [`${p}:active`]: {
                fontSize: '24px',
                color: 'red',
            },
        },
        [MEDIA_MAX_HEIGHT]: {
            color: 'lightgreen',
            fontSize: '24px',
            [`${p}:hover:active`]: {
                fontSize: '18px',
            },
        },
    };
};

export const createStylesheet = options => ({
    container: createContainerStyle(options),
    button: createButtonStyle(options),
});
