/* @flow */

import postRobot from '../src';

window.console.karma = (...args) => {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', args);
    }
    // eslint-disable-next-line no-console
    console.log(...args);
};

const IE8_USER_AGENT = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';

export function enableIE8Mode() : { cancel : () => void } {

    postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;
    window.navigator.mockUserAgent = IE8_USER_AGENT;

    return {
        cancel() {
            postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
            delete window.navigator.mockUserAgent;
        }
    };
}
