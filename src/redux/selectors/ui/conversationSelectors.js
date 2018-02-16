import { createSelector } from 'reselect';
// selector
const getConversationState = state => state.ui.conversation;
// reselect function
export const getConversationIdShowState = createSelector(
    [ getConversationState ],
    (conversation) => conversation.conversationIdShow
);
