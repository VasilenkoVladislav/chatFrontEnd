import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    toggle: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const DropDownToggle = ({toggle, children, className}) => {
    return (
        <div onClick={toggle} className={className}>{children}</div>
    );
};

DropDownToggle.propTypes = propTypes;

export default DropDownToggle;
