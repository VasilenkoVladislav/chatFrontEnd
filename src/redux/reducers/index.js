import { combineReducers } from 'redux';
import entitiesReducers from './entities/index';
import { routerReducer } from 'react-router-redux';
import uiReducers from './ui/index';

export default combineReducers({
    entities: entitiesReducers,
    ui: uiReducers,
    routing: routerReducer
});
