import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    toggle: PropTypes.func,
    children: PropTypes.node.isRequired
};

const DropDownToggle = ({toggle, children}) => {
    return (
        <div className="ch-dropdown-toggle" onClick={toggle}>{children}</div>
    );
};

DropDownToggle.propTypes = propTypes;

export default DropDownToggle;
