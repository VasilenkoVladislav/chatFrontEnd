import './DropDown.scss';
import React, { cloneElement } from 'react';
import DropDownMenu from './DropDownMenu';
import DropDownToggle from './DropDownToggle';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};

const DropDown = ({isOpen, toggle, children}) => {
    const handleBlur = () => {
        if (isOpen) {
            toggle();
        }
    };
    const boundChildren = React.Children.map(children, child => {
        if (child.type === DropDownToggle) {
            child = cloneElement(child, { toggle });
        } else if (child.type === DropDownMenu && !isOpen) {
            child = null;
        }
        return child;
    });
    return (
        <div className="ch-dropdown"
            onClick={toggle}
            onBlur={handleBlur}
            tabIndex='0'>
            {boundChildren}
        </div>
    );
};

DropDown.propTypes = propTypes;

export default DropDown;
