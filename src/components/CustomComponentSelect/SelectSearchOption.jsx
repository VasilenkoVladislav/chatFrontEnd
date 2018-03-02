import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
};

const SelectSearchOption = (props) => {
    const handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.onSelect(props.option, event);
    };
    const handleMouseEnter = (event) => {
        props.onFocus(props.option, event);
    };
    const handleMouseMove = (event) => {
        if (props.isFocused) return;
        props.onFocus(props.option, event);
    };
    return (
        <div className={props.className} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove}>
            <img className="ch-search-image" src={props.option.image_small || '/static/images/default-avatar.png'}/>
            <div>
                {props.option.name}
            </div>
        </div>
    );
};

SelectSearchOption.propTypes = propTypes;

export default SelectSearchOption;
