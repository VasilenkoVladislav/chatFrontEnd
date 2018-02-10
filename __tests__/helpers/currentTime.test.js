import Cookie from 'js-cookie';
import { currentTime } from 'helpers/currentTime';

jest.useFakeTimers();

describe('CurrentTime Test', () => {
    it('return current time if cookie exist', () => {
        Cookie.set('serverTime', 1000);
        currentTime.startCountdown();
        expect(currentTime.getTime()).toEqual(1000);
        currentTime.stopCountDown();
    });
    it('return next current time if cookie exist', () => {
        Cookie.set('serverTime', 1000);
        currentTime.startCountdown();
        jest.runOnlyPendingTimers();
        expect(currentTime.getTime()).toEqual(2000);
        currentTime.stopCountDown();
    });
    it('return current time if cookie not exist', () => {
        Cookie.set('serverTime', '');
        currentTime.startCountdown();
        expect(currentTime.getTime()).toBeGreaterThanOrEqual(Date.now() - 5);
        currentTime.stopCountDown();
    });
    it('return current time if cookie not exist but later exist', () => {
        Cookie.set('serverTime', '');
        currentTime.startCountdown();
        Cookie.set('serverTime', 1000);
        jest.runOnlyPendingTimers();
        expect(currentTime.getTime()).toEqual(1000);
        currentTime.stopCountDown();
    });
});
