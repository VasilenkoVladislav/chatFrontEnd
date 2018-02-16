import { createSelector } from 'reselect';

// selector
const getConversations = (state) => state.entities.conversations;

// reselect function
export const getConversationsEntitiesState = createSelector(
    [ getConversations ],
    (conversations) => conversations.allIds.map(id => conversations.entities[id])
);

export const getConversationByIdState = createSelector(
    getConversations,
    (state, props) => props.conversationId,
    (conversations, conversationId) => conversations.entities[conversationId]
);

export const getConversationMessagesIdsState = createSelector(
    getConversationByIdState,
    (conversation) => conversation.messages || []
);
