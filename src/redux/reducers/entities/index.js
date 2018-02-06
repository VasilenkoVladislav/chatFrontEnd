import { combineReducers } from 'redux';
import headersReducer from './headersReducer';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    headers: headersReducer
});
