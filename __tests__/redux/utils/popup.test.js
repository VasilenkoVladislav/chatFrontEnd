import * as actions from 'redux/utils/popup';

describe('popup test', () => {
    describe('getPopupSize', () => {
        it('facebook', () => {
            const provider = 'facebook';
            expect(actions.getPopupSize(provider)).toEqual({width: 1020, height: 620 });
        });
        it('google', () => {
            const provider = 'google';
            expect(actions.getPopupSize(provider)).toEqual({width: 452, height: 633 });
        });
        it('google', () => {
            const provider = 'twitter';
            expect(actions.getPopupSize(provider)).toEqual({width: 620, height: 370 });
        });
        it('another social network', () => {
            const provider = 'another';
            expect(actions.getPopupSize(provider)).toEqual({width: 1020, height: 620 });
        });
    });
    describe('getPopupOffset', () => {
        it('facebook', () => {
            const provider = 'facebook';
            const { width, height } = actions.getPopupSize(provider);
            expect(actions.getPopupOffset({ width, height })).toEqual({left: 2, top: 74});
        });
        it('google', () => {
            const provider = 'google';
            const { width, height } = actions.getPopupSize(provider);
            expect(actions.getPopupOffset({ width, height })).toEqual({left: 286, top: 67.5});
        });
        it('twitter', () => {
            const provider = 'google';
            const { width, height } = actions.getPopupSize(provider);
            expect(actions.getPopupOffset({ width, height })).toEqual({left: 286, top: 67.5});
        });
        it('another social network', () => {
            const provider = 'another';
            const { width, height } = actions.getPopupSize(provider);
            expect(actions.getPopupOffset({ width, height })).toEqual({left: 2, top: 74});
        });
    });
    describe('getPopupDimensions', () => {
        it('facebook', () => {
            const provider = 'facebook';
            expect(actions.getPopupDimensions(provider)).toEqual('width=1020,height=620,top=74,left=2');
        });
        it('google', () => {
            const provider = 'google';
            expect(actions.getPopupDimensions(provider)).toEqual('width=452,height=633,top=67.5,left=286');
        });
        it('twitter', () => {
            const provider = 'google';
            expect(actions.getPopupDimensions(provider)).toEqual('width=452,height=633,top=67.5,left=286');
        });
        it('another social network', () => {
            const provider = 'another';
            expect(actions.getPopupDimensions(provider)).toEqual('width=1020,height=620,top=74,left=2');
        });
    });
    describe('openPopupOAuthSignIn', () => {
        it('openPopupOAuthSignIn test', () => {
            const provider = 'facebook';
            global.open = jest.fn(() => {
                return {
                    location: {
                        search: '?auth_token=bdeWDfor952-TCXO_nfQIw&blank=true&client_id=wTwJAC6FicXvdea4IpL4pw&config=&expiry=1510316429&uid=308682086308492'
                    },
                    close: () => jest.fn()
                };
            });
            actions.openPopupOAuthSignIn(provider);
            expect(global.open).toHaveBeenCalledTimes(1);
        });
    });
});
