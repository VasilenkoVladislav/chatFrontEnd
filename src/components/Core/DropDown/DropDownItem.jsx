import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const DropDownItem = ({children, className}) => <div className={className}>{children}</div>;

DropDownItem.propTypes = propTypes;

export default DropDownItem;
