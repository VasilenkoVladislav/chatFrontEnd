import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
    conversation: conversationReducer,
    modals: modalsReducer
});
