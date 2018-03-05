import './Conversations.scss';
import { DropDown, DropDownToggle, DropDownMenu, DropDownItem } from 'components/Core/DropDown';
import React, { Component } from 'react';
import Conversation from 'components/MainPage/Conversation';
import ItemsSearch from 'components/Core/ItemsSearch';
import PropTypes from 'prop-types';
import { search } from 'api/utils/Search';

const propTypes = {
    currentUserSmallAvatar: PropTypes.string.isRequired,
    currentUserName: PropTypes.string.isRequired,
    conversationIdShow: PropTypes.string.isRequired,
    conversations: PropTypes.array.isRequired,
    closeConversation: PropTypes.func.isRequired,
    createConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    showConversation: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};

class Conversations extends Component {
    constructor (props) {
        super(props);
        this.state = { isOpen: false };
    }
    componentWillMount () {
        this.props.getConversations();
    }
    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };
    onChangeItemsSearch = (result) => {
        if (result.conversation_id) {
            this.props.showConversation(result.conversation_id);
        } else {
            const data = {
                conversation: {
                    id: result.conversation_id,
                    user_id: result.id
                }
            };
            this.props.createConversation(data);
        }
    };
    render () {
        return (
            <div className="ch-conversations-wrap">
                <header className="ch-conversations-header">
                    <div className="ch-conversations-header-wrap">
                        <div className="ch-conversations-header-user-info-wrap">
                            <img className="ch-avatar-small" src={this.props.currentUserSmallAvatar}/>
                            <div className="ch-conversations-header-user-block">
                                <span className="ch-conversations-header-username">{this.props.currentUserName}</span>
                                <span className="ch-conversations-header-status">Available</span>
                            </div>
                        </div>
                        <DropDown isOpen={this.state.isOpen} toggle={this.toggle}>
                            <DropDownToggle>
                                <i className="ch-icon fas fa-ellipsis-h"/>
                            </DropDownToggle>
                            <DropDownMenu>
                                <DropDownItem>Help and feedback</DropDownItem>
                                <DropDownItem>Settings</DropDownItem>
                                <DropDownItem onClick={this.props.signOut}>Sign Out</DropDownItem>
                            </DropDownMenu>
                        </DropDown>
                    </div>
                    <ItemsSearch
                        cache={false}
                        onChange={this.onChangeItemsSearch}
                        multi={false}
                        backspaceRemoves={true}
                        searchable={true}
                        labelKey="name"
                        valueKey="id"
                        placeholderMessage="Search for people"
                        searchParams="search_users"
                        getOptions={search.searchUsers}/>
                </header>
                <div className="ch-conversations-container">
                    <ul className="ch-conversation-list-wrap">
                        {this.props.conversations.map(conversation =>
                            <li key={conversation.id}>
                                <Conversation
                                    conversation={conversation}
                                    conversationIdShow={this.props.conversationIdShow}
                                    showConversation={this.props.showConversation}
                                    closeConversation={this.props.closeConversation}/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

Conversations.propTypes = propTypes;

export default Conversations;
