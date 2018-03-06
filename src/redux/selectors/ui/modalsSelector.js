export const getModalIsOpenState = (state, typeModal) => {
    return state.ui.modals.find(modal => modal.type === typeModal) || false;
};
