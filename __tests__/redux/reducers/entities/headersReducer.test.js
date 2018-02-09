import { UPDATE_HEADERS, SIGN_OUT_SUCCESS } from 'redux/constansActions';
import { headers } from 'data/headersData';
import headersReducer from 'redux/reducers/entities/headersReducer';

describe('headers reducer', () => {
    it('should return the initial state', () => {
        expect(headersReducer(undefined, {})).toEqual({});
    });
    it('should handle UPDATE_HEADERS', () => {
        expect(headersReducer({}, { type: UPDATE_HEADERS, payload: headers })).toEqual(headers);
    });
    it('should handle SIGN_OUT_SUCCESS', () => {
        expect(headersReducer(headers, { type: SIGN_OUT_SUCCESS })).toEqual({});
    });
});
