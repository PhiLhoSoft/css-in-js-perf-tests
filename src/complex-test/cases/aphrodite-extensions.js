import { StyleSheet } from 'aphrodite';
import { StyleSheet as StyleSheetNoImportant } from 'aphrodite/no-important';

const globalSelectorHandler = (selector, _, generateSubtreeStyles) => {
    if (selector[0] !== "!") {
        return null;
    }

    return generateSubtreeStyles(selector.slice(1));
};

const globalExtension = { selectorHandler: globalSelectorHandler };

export const ExtendedStyleSheet = StyleSheet.extend([ globalExtension ]);
export const ExtendedStyleSheetNoImportant = StyleSheetNoImportant.extend([ globalExtension ]);
