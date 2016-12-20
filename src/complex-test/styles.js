const MEDIA_MAX_WIDTH = '@media (max-width: 800px)';

// Some libraries like free-style require to write '&:hover',
// others accept either form, others choke on it...
function p(o) { return o && o.prefixPseudo ? '&' : ''; }

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
    fontSize: '50px',
    display: 'flex',
    flexDirection: 'column',
};

const bottomStyle = {
    backgroundColor: 'darkblue',
    color: 'gold',
    textAlign: 'right',
    display: 'flex',
};

const containerStyle = {
    backgroundColor: 'ghostwhite',
    display: 'flex',
    [MEDIA_MAX_WIDTH]: {
        backgroundColor: 'ivory',
    },
};

const titleStyle = {
    backgroundColor: 'chartreuse',
    color: 'deepblue',
    textAlign: 'center',
    fontSize: '30px',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '20px',
    },
};

const helpStyle = {
    backgroundColor: 'chartreuse',
    color: 'deepblue',
    textAlign: 'center',
    fontSize: '30px',
    [MEDIA_MAX_WIDTH]: {
        fontSize: '20px',
    },
};

const createComponentStyle = options => ({
    color: 'yellow',
    backgroundColor: 'blue',
    textAlign: 'center',
    padding: '30px',
    fontSize: '50px',
    [`${p(options)}:hover`]: { backgroundColor: 'darkturquoise' },
});

const createButtonStyle = options => ({
    color: 'yellow',
    backgroundColor: 'rebeccapurple',
    fontSize: '30px',
    border: '3px solid yellow',
    [`${p(options)}:hover`]: {
        color: 'lightblue',
    },
});

export default function createStyleSheet(options) {
    return {
        body: bodyStyle,
        top: topStyle,
        bottom: bottomStyle,
        container: containerStyle,
        title: titleStyle,
        help: helpStyle,
        component: createComponentStyle(options),
        button: createButtonStyle(options),
    };
}
