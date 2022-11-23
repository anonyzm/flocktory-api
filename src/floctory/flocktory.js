const axios = require('axios');
const config = require('../config/constants');

const FLOCKTORY_BASE_URL = 'https://api.flocktory.com/';

const apiCall = (baseUrl, endpoint, data, params = {}) => {
    const url = FLOCKTORY_BASE_URL + endpoint;
    if (config.DEBUG) {
        console.log("Request URL: " + url)
        console.log("Request Data:")
        console.log(data)
    }
    return axios.get(url, {
        method: 'get',
        params: {
            body: JSON.stringify(data),
            ...params
        },
        headers: headers
    })
        .then((response) => new Promise((resolve) => {
            if (config.DEBUG) {
                console.log("Response Data: ")
                console.log(response.data)
            }
            resolve(response.data);
        }))
        .catch((error) => {
            console.error('Error:', error);
        });
}

/**
 * Floctory session initialization
 * @param siteId
 * @returns {Promise<unknown>}
 * @constructor
 */
const FlocktoryInit = (siteId) =>
    apiCall(FLOCKTORY_BASE_URL, 'u_shaman/setup-api', {
        "siteId": siteId
    });

/**
 * Attaching token
 * @param token
 * @param siteId
 * @param sessionId
 * @param senderId
 * @returns {Promise<unknown>}
 * @constructor
 */
const FlocktoryPushAttach = (token, siteId, sessionId, senderId) =>
    apiCall(FLOCKTORY_BASE_URL, 'u_flockman/attach-push-to-session', {
        "from-mobile-app": true,
        "platform": "firebase",
        "os": "android",
        "site-id": siteId,
        "token": "https://android.googleapis.com/gcm/send/" + token,
        "provider-meta": {
            "gcm-sender-id": senderId
        },
        "site-session-id": sessionId
    });

/**
 * Setting custom crm_id
 * @param siteId
 * @param sessionId
 * @param crmId
 * @returns {Promise<unknown>}
 * @constructor
 */
const FlocktorySetCustomMeta = (siteId, sessionId, crmId) =>
    apiCall(FLOCKTORY_BASE_URL, 'u_flockman/set-profile-custom-meta.js', {
        "site-id": siteId,
        "meta": {
            "crm_id": crmId
        },
        "site-session-id": sessionId
    }, {
        callback: "flock_jsonp"
    });

module.exports = {FlocktoryInit, FlocktoryPushAttach, FlocktorySetCustomMeta};