import { connect } from 'react-redux';
import { getModalIsOpenState } from 'redux/selectors/ui/modalsSelector';
import ModalConversationUser from './ModalConversationUser';
import { toggleModal } from 'redux/actions/ui/modalsActions';

function mapStateToProps (state) {
    return {
        isOpen: getModalIsOpenState(state, 'conversationUser')
    };
}

function mapDispatchToProps (dispatch) {
    return {
        toggleModal: () => dispatch(toggleModal('conversationUser'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalConversationUser);
