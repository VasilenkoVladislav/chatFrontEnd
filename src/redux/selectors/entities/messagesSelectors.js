import { createSelector } from 'reselect';
import { getConversationMessagesIdsState } from './conversationsSelectors';
// selector
const getMessages = (state) => state.entities.messages;

// reselect function
export const getMessagesByConversationIdState = createSelector(
    getMessages,
    getConversationMessagesIdsState,
    (messages, messageIds) => messageIds.map(id => messages.entities[id])
);
