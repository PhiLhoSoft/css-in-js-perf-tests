export const MEDIA_MAX_WIDTH = '@media (max-width: 800px)';

// Some libraries like free-style require to write '&:hover',
// others accept either form, others choke on it...
export function p(o) { return o && o.prefixPseudo ? '&' : ''; }
// Likewise, some libraries distinguish tag names from class selectors, thus need an initial dot.
// Of course, these are only adaptors to make the style sheets library agnostic, these tricks are not necessary in real code.
export function s(o) { return o && o.classNamesWithSelector ? '.' : ''; }

const htmlStyle = {
    height: '100%',
    boxSizing: 'border-box',
};
const boxSizing = {
    boxSizing: 'inherit',
};

const bodyStyle = {
    height: '100%',
    position: 'relative',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
};

const topStyle = {
    backgroundColor: 'blue',
    color: 'yellow',
    textAlign: 'center',
    fontSize: '30px',
    display: 'flex',
    flexDirection: 'column',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '20px',
    },
};

const containerStyle = {
    backgroundColor: 'mintcream',
    display: 'flex',
    flex: 1,
    [MEDIA_MAX_WIDTH]: {
        backgroundColor: 'greenyellow',
    },
};

const itemContainerStyle = {
    backgroundColor: 'ghostwhite',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    [MEDIA_MAX_WIDTH]: {
        backgroundColor: 'ivory',
    },
};

const sideContainerStyle = {
    backgroundColor: 'mintcream',
    display: 'flex',
    flex: 0.33,
    flexDirection: 'column',
    [MEDIA_MAX_WIDTH]: {
        backgroundColor: 'greenyellow',
    },
};

const bottomStyle = {
    backgroundColor: 'darkblue',
    color: 'gold',
    textAlign: 'right',
    padding: '4px 8px',
};

const titleStyle = {
    backgroundColor: 'chartreuse',
    backgroundImage: 'linear-gradient(to bottom, chartreuse, aquamarine)',
    color: 'darkblue',
    textAlign: 'center',
    fontSize: '24px',
    border: '2px solid green',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '18px',
    },
};

const helpStyle = {
    backgroundColor: 'palegreen',
    color: 'darkblue',
    fontSize: '16px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '12px',
    },
};

const libraryContainerStyle = {
    backgroundColor: 'beige',
    color: 'darkblue',
    fontSize: '16px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '12px',
    },
};

const createButtonStyle = options => ({
    color: 'yellow',
    backgroundColor: 'rebeccapurple',
    fontSize: '30px',
    padding: '16px',
    width: '25%',
    border: '4px solid orange',
    borderRadius: '30px',
    [`${p(options)}:hover`]: {
        color: 'lightblue',
        borderColor: 'dodgerblue',
    },
});

export default function createStyleSheet(options) {
    const globals = {
        html: htmlStyle,
        '*, *:before, *:after': boxSizing,
        body: bodyStyle,
    };
    const appStyleSheet = {
        [`${s(options)}top`]: topStyle,
        [`${s(options)}container`]: containerStyle,
        [`${s(options)}sideContainer`]: sideContainerStyle,
        [`${s(options)}bottom`]: bottomStyle,
        [`${s(options)}itemContainer`]: itemContainerStyle,
        [`${s(options)}title`]: titleStyle,
        [`${s(options)}help`]: helpStyle,
        [`${s(options)}libraryContainer`]: libraryContainerStyle,
        [`${s(options)}button`]: createButtonStyle(options),
    };
    if (options && options.classNamesWithSelector) {
        // Naturally distingish tag names from class selectors
        Object.assign(appStyleSheet, globals);
    } else {
        appStyleSheet.$globals$ = globals;
    }
    return appStyleSheet;
}
