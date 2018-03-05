import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};

const DropDownItem = ({children, onClick}) => <div className="ch-dropdown-item" onClick={onClick}>{children}</div>;

DropDownItem.propTypes = propTypes;

export default DropDownItem;
