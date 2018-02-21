import WebSocket from './webSocket';

export class WebSocketSingleton {
    static instance = null;

    constructor () {
        if (WebSocketSingleton.instance) {
            return WebSocketSingleton.instance;
        }
        WebSocketSingleton.instance = this;
    }
    initializeWebSocket ({dispatch}) {
        if (!this.webSocket) {
            this.webSocket = new WebSocket(dispatch);
        }
    }
    getWebSocket () {
        return this.webSocket;
    }
}

export const webSocketSingleton = new WebSocketSingleton();
