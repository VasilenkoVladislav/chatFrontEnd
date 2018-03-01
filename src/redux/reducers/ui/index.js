import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';
import modalsReducer from './modalsReducer';
import updateMessageReducer from './updateMessageReducer';

export default combineReducers({
    conversation: conversationReducer,
    modals: modalsReducer,
    updateMessage: updateMessageReducer
});
