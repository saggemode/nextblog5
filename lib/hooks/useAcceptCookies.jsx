import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
var COOKIE_NAME = 'accept_cookies';

var useAcceptCookies = function () {
    var _a = useState(true), acceptedCookies = _a[0], setAcceptedCookies = _a[1];
    useEffect(function () {
        if (!Cookies.get(COOKIE_NAME)) {
            setAcceptedCookies(false);
        }
    }, [setAcceptedCookies]);
    var acceptCookies = function () {
        setAcceptedCookies(true);
        Cookies.set(COOKIE_NAME, 'accepted', { expires: 365 });
    };
    return {
        acceptedCookies: acceptedCookies,
        onAcceptCookies: acceptCookies,
    };
};
exports.useAcceptCookies = useAcceptCookies;
