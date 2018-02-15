import Base from './Base';
import config from 'configApi/config';

export default class Conversations extends Base {
    getConversations = (headers) => {
        return this.apiClient.get(`${config.conversations.conversations}`, {}, headers);
    };
    createConversation = (data, headers) => {
        return this.apiClient.post(`${config.conversations.conversations}`, data, headers);
    };
    updateConversation = ({conversationId, data}, headers) => {
        return this.apiClient.put(`${config.conversations.conversations}${conversationId}`, data, headers);
    };
    deleteConversation = (conversationId, headers) => {
        return this.apiClient.delete(`${config.conversations.conversations}${conversationId}`, headers);
    };
}
