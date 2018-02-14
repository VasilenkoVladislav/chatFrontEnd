export function resetInitialState () {
    const head = document.getElementsByTagName('head')[0];
    const initialStateScript = document.getElementById('initialState');
    if (window.REDUX_INITIAL_STATE && initialStateScript) {
        delete window.REDUX_INITIAL_STATE;
        head.removeChild(initialStateScript);
    }
}
