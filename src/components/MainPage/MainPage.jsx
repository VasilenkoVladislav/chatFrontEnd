import './MainPage.scss';
import Conversations from 'components/MainPage/Conversations';
import Messages from 'components/MainPage/Messages';
import Preview from 'components/MainPage/Preview';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    conversationIdShow: PropTypes.string.isRequired
};

const MainPage = ({conversationIdShow}) => {
    return (
        <div className="ch-main-page-container">
            <Conversations/>
            {conversationIdShow
                ? <Messages conversationId={conversationIdShow}/>
                : <Preview/>}
        </div>
    );
};

MainPage.propTypes = propTypes;

export default MainPage;
