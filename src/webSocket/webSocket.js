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
        console.log(event);
    };
    onDisconnect = () => {
    };
    onWebSocketError = () => {
    };
    subscribeConversationChannel = (channel) => {
        if (this.io) {
            this.io.emit('subscribeChannel', channel);
        }
    }
}
