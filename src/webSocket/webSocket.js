import { createMessageSuccess,
    updateMessageSuccess,
    deleteMessageSuccess } from 'redux/actions/entities/messagesActions';
import config from 'configApi/config';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import io from 'socket.io-client';

export default class WebSocket {
    constructor (getState, dispatch) {
        this.getState = getState;
        this.dispatch = dispatch;
        this.wsUrl = config[process.env.NODE_ENV].webSocketUrl;
    }
    createWebSocketConnection () {
        const headers = getHeadersState(this.getState());
        if (!headers) {
            throw new Error('headers is not defined!');
        }
        if (this.io) {
            this.io.close();
        }
        this.io = io.connect(this.wsUrl, {
            query: `client=${headers ? headers['client'] : ''}`
        });
        this.io.on('connect', this.onWebSocketConnect);
        this.io.on('evt', this.onWebSocketMessage);
        this.io.on('disconnect', this.onDisconnect);
        this.io.on('error', this.onWebSocketError);
    }
    closeWebSocketConnection () {
        if (this.io) {
            this.io.close();
        }
    }
    onWebSocketConnect = () => {
    };
    onWebSocketMessage = (event) => {
        let data = '';
        try {
            data = JSON.parse(event);
        } catch (error) {
            data = '';
        }
        switch (data.type) {
        case 'message':
            this.actionMessage(data);
            break;
        }
    };
    onDisconnect = () => {
    };
    onWebSocketError = () => {
    };
    subscribeConversationChannel = (channel) => {
        if (this.io) {
            this.io.emit('subscribeChannel', channel);
        }
    };
    actionMessage (message) {
        switch (message.action) {
        case 'create':
            this.dispatch(createMessageSuccess(message.data.conversation_id, message.data));
            break;
        case 'update':
            this.dispatch(updateMessageSuccess(message.data.conversation_id, message.data));
            break;
        case 'destroy':
            this.dispatch(deleteMessageSuccess(message.data.conversation_id, message.data.id));
            break;
        }
    }
}
