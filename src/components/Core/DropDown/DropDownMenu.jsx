import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const DropDownMenu = ({children, className}) => {
    return (
        <div className={className}>{children}</div>
    );
};

DropDownMenu.propTypes = propTypes;

export default DropDownMenu;
