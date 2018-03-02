import './ItemsSearch.scss';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import SelectSearchOption from 'components/CustomComponentSelect/SelectSearchOption';

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
    const getOptions = async (input) => {
        if (!input) {
            return { options: [] };
        }
        const data = {
            [props.searchParams]: input
        };
        const options = await props.getOptions(data);
        return { options };
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
                optionComponent={SelectSearchOption}
                loadOptions={getOptions}/>
        </div>
    );
};

ItemsSearch.propTypes = propTypes;

export default ItemsSearch;
