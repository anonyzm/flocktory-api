var axios = require('axios');

const FLOCKTORY_BASE_URL = 'https://api.flocktory.com/';
const FLOCKTORY_DEBUG = true;

const apiCall = (endpoint, data) => {
    const url = FLOCKTORY_BASE_URL + endpoint; // + "?body=" + JSON.stringify(data);
    if (FLOCKTORY_DEBUG) {
        console.log("Request URL: " + url)
        console.log("Request Data:")
        console.log(data)
    }
    return axios.get(url, {
        method: 'get',
        params: {
            body: JSON.stringify(data)
        }
    })
        .then((response) => new Promise((resolve) => {
            if (FLOCKTORY_DEBUG) {
                console.log("Response Data: ")
                console.log(response.data)
            }
            resolve(response.data);
        }))
        .catch((error) => {
            console.error('Error:', error);
        });
}

const flocktoryInit = (siteId) =>
    apiCall('u_shaman/setup-api', {
        "siteId": siteId
    });

const flocktoryPushAttach = (token, siteId, sessionId, senderId) =>
    apiCall('u_flockman/attach-push-to-session', {
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

module.exports = {flocktoryInit, flocktoryPushAttach};