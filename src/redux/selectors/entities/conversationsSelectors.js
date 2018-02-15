import { createSelector } from 'reselect';
// selector
const getConversationsState = (state) => state.entities.conversations;
// reselect function
export const getConversationsEntitiesState = createSelector(
    [ getConversationsState ],
    (conversations) => conversations.entities
);
