const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

function requestFactory(){
    const axios = require('axios').default;
    axiosCookieJarSupport(axios);
    return axios.create({
        jar: new tough.CookieJar(),
        withCredentials: true
    });
}

module.exports = requestFactory;