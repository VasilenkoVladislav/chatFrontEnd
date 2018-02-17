import './ItemsSearch.scss';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

const propTypes = {
    multi: PropTypes.bool,
    searchable: PropTypes.bool,
    maxLength: PropTypes.number,
    backspaceRemoves: PropTypes.bool,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    onChange: PropTypes.func,
    placeholderMessage: PropTypes.string,
    disableCache: PropTypes.bool,
    getOptions: PropTypes.func.isRequired,
    searchParams: PropTypes.string.isRequired
};

const ItemsSearch = (props) => {
    const getOptions = (input) => {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        let resArray = [];
        const data = {
            [props.searchParams]: input
        };
        return props.getOptions(data)
            .then(response => {
                _.each(response, item => resArray.push(item));
                return {options: resArray};
            });
    };
    return (
        <div className="ch-items-search-wrap">
            <Select.Async
                inputProps={{maxLength: props.maxLength || 30}}
                placeholder={props.placeholderMessage}
                value={props.value}
                multi={props.multi}
                searchable={props.searchable}
                backspaceRemoves={props.backspaceRemoves}
                labelKey={props.labelKey}
                valueKey={props.valueKey}
                onChange={props.onChange}
                loadOptions={getOptions}/>
        </div>
    );
};

ItemsSearch.propTypes = propTypes;

export default ItemsSearch;
