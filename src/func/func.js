export const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none';
    loadingScreen.style.opacity = '0';
};

export const getElementCursorPointerPosition = elementNode => {
    const selection = window.getSelection();

    if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode === elementNode) {
            return range.endOffset;
        }
    }

    return -1;
};

export const setElementCursorPointer = (elementNode, offset) => {
    if (elementNode.childNodes.length > 0 && offset >= 0) {
        const range = document.createRange();
        range.setStart(elementNode.childNodes[0], offset);
        range.collapse(true);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

export const setElementCursorPointerToEnd = elementNode => {
    if (elementNode.childNodes.length > 0) {
        const range = document.createRange();
        range.selectNodeContents(elementNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
};