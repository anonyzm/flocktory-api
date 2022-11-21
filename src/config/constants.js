module.exports = Object.freeze({
    // Application config
    PORT: process.env.PORT || 3000,
    DEBUG: (process.env.DEBUG === 'true'),
    AUTH_TOKEN: process.env.AUTH_TOKEN,

    // Flocktory & Firebase config
    SITE_ID: process.env.SITE_ID,
    SENDER_ID: process.env.SENDER_ID,

    // Flocktory Client API credentials
    CLIENT_API_KEY: process.env.CLIENT_API_KEY,
    CLIENT_API_TOKEN: process.env.CLIENT_API_TOKEN
});