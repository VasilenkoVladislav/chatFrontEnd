import { GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_ERROR,
    CREATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_SUCCESS,
    SIGN_OUT_SUCCESS } from 'redux/constansActions';
import _ from 'lodash';

const initialState = {
    entities: {},
    allIds: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_MESSAGES_REQUEST:
        return { ...state, isLoading: true };
    case GET_MESSAGES_SUCCESS:
        return { ...state,
            entities: action.payload.data,
            allIds: _.map(action.payload.data, 'id'),
            isLoading: false
        };
    case GET_MESSAGES_ERROR:
        return { ...state, isLoading: false };
    case CREATE_MESSAGE_SUCCESS:
        return { ...state,
            entities: {...state.entities,
                [action.payload.data.id]: action.payload.data
            },
            allIds: [action.payload.data.id, ...state.allIds]
        };
    case UPDATE_MESSAGE_SUCCESS:
        return { ...state,
            entities: {...state.entities,
                [action.payload.data.id]: action.payload.data
            }
        };
    case DELETE_MESSAGE_SUCCESS:
        return { ...state,
            entities: _.omit(state.entities, action.payload.messageId),
            allIds: state.allIds.filter(id => id !== action.payload.messageId)
        };
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
