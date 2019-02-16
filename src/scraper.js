const cheerio = require('cheerio');
const { prop } = require('./util');

const getData = prop('data');

function Scraper(requestService) {
    let result = {};
    let defaultHeaders = {};
    let promise = Promise.resolve();
    let referer = null;    

    const instance = {
        setDefaultHeaders,
        fetchPage,
        getResult,
        goToPage,
        sendForm
    };

    function doRequestAndExecuteCallback(config, callbackHandle) {
        return requestService({
            url: config.url,
            headers: {
                Referer: referer,
                ...defaultHeaders,
                ...config.headers
            },
            ...config
        })
            .then(getData)
            .then(cheerio.load)
            .then($html => callbackHandle($html, result))
            .then(callbackResult => {
                result = callbackResult;
            });
    }

    function doRequestAndExecuteCallbackWithReferer(config, callbackHandle) {
        return doRequestAndExecuteCallback(config, callbackHandle)
            .then(() => {
                referer = config.url;
            });
    }

    function setDefaultHeaders(headers = {}) {
        defaultHeaders = headers;
        return instance;
    }

    function fetchPage(config, callbackHandle) {
        promise = promise
            .then(() => doRequestAndExecuteCallback(config, callbackHandle));
        return instance;
    }

    function goToPage(config, callbackHandle) {
        promise = promise
            .then(() => doRequestAndExecuteCallbackWithReferer(config, callbackHandle));
        return instance;
    }

    function sendForm(config, callbackHandle) {
        promise = promise
            .then(() => doRequestAndExecuteCallbackWithReferer(config, callbackHandle));
        return instance;
    }

    function getResult() {
        return promise.then(() => result);
    }

    return instance;
}

module.exports = Scraper