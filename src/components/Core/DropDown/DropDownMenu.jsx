import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    children: PropTypes.node.isRequired
};

const DropDownMenu = ({children}) => {
    return (
        <div className="ch-dropdown-menu">{children}</div>
    );
};

DropDownMenu.propTypes = propTypes;

export default DropDownMenu;
