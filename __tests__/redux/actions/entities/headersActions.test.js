import * as actions from 'redux/actions/entities/headersActions';
import * as constansActions from 'redux/constansActions';
import { headers } from 'data/headersData';

describe('headersActions', () => {
    it('should return action type UPDATE_HEADERS and payload headers if call updateHeaders', () => {
        const expectedValue = { type: constansActions.UPDATE_HEADERS, payload: headers };
        expect(actions.updateHeaders(headers)).toEqual(expectedValue);
    });
});
