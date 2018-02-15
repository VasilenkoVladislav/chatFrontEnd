import Base from './Base';
import config from 'configApi/config';

export default class Messages extends Base {
    getMessages = (conversationId, headers) => {
        return this.apiClient.get(`${config.conversations.conversations}${conversationId}${config.messages.messages}`, {}, headers);
    };
    createMessage = ({conversationId, data}, headers) => {
        return this.apiClient.post(`${config.conversations.conversations}${conversationId}${config.messages.messages}`, data, headers);
    };
    updateMessage = ({conversationId, messageId, data}, headers) => {
        return this.apiClient.put(`${config.conversations.conversations}${conversationId}${config.messages.messages}${messageId}`, data, headers);
    };
    deleteMessage = ({conversationId, messageId}, headers) => {
        return this.apiClient.delete(`${config.conversations.conversations}${conversationId}${config.messages.messages}${messageId}`, headers);
    };
}
