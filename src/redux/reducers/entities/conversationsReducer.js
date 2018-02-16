import { GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_ERROR,
    CREATE_CONVERSATION_SUCCESS,
    UPDATE_CONVERSATION_SUCCESS,
    DELETE_CONVERSATION_SUCCESS,
    SIGN_OUT_SUCCESS,
    GET_MESSAGES_SUCCESS,
    CREATE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_SUCCESS } from 'redux/constansActions';
import _ from 'lodash';

const initialState = {
    entities: {},
    allIds: [],
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_CONVERSATIONS_REQUEST:
        return { ...state, isLoading: true };
    case GET_CONVERSATIONS_SUCCESS:
        return { ...state,
            entities: {...state.entities, ...action.payload },
            allIds: [..._.map(action.payload, 'id'), ...state.allIds],
            isLoading: false
        };
    case GET_CONVERSATIONS_ERROR:
        return { ...state, isLoading: false };
    case CREATE_CONVERSATION_SUCCESS:
        return { ...state,
            entities: {...state.entities,
                [action.payload.id]: action.payload
            },
            allIds: [action.payload.id, ...state.allIds]
        };
    case UPDATE_CONVERSATION_SUCCESS:
        return { ...state,
            entities: {...state.entities,
                [action.payload.id]: action.payload
            }
        };
    case DELETE_CONVERSATION_SUCCESS:
        return { ...state,
            entities: _.omit(state.entities, action.payload),
            allIds: state.allIds.filter(id => id !== action.payload)
        };
    case GET_MESSAGES_SUCCESS:
        return { ...state,
            entities: { ...state.entities,
                [action.payload.conversationId]: {
                    ...state.entities[action.payload.conversationId],
                    messages: _.map(action.payload.data, 'id')
                }
            }
        };
    case CREATE_MESSAGE_SUCCESS:
        return { ...state,
            entities: { ...state.entities,
                [action.payload.conversationId]: {
                    ...state.entities[action.payload.conversationId],
                    messages: [...state.entities[action.payload.conversationId].messages, action.payload.data.id]
                }
            }
        };
    case DELETE_MESSAGE_SUCCESS:
        return { ...state,
            entities: { ...state.entities,
                [action.payload.conversationId]: {
                    ...state.entities[action.payload.conversationId],
                    messages: state.entities[action.payload.conversationId].messages.filter(id => id !== action.payload.messageId)
                }
            }
        };
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
