

function setCookie(key, val) {
    document.cookie = key + '=' + val;
}
function parseCookie() {
    var pairs = document.cookie.split(';');
    var cookie = {};
    pairs.forEach((pair) => {
        var items = pair.split('=');
        cookie[items[0].trim()] = items[1];
    })
    return cookie;
}

function stringfy(obj) {
    let str = '';
    Object.keys(obj).forEach((key) => {
        str += key + '=' + obj[key] + ';';
    })
    return str;
}

function getCookie(key) {
    var cookie = parseCookie();
    return cookie[key.trim()];
}

export {
    getCookie,
    setCookie,
}