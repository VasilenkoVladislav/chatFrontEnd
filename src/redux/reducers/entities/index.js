import { combineReducers } from 'redux';
import conversationsReducer from './conversationsReducer';
import headersReducer from './headersReducer';
import messagesReducer from './messagesReducer';
import userReducer from './userReducer';

export default combineReducers({
    conversations: conversationsReducer,
    headers: headersReducer,
    messages: messagesReducer,
    user: userReducer
});
