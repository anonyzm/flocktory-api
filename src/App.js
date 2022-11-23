const express = require('express');
const bearerToken = require('express-bearer-token');
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/constants');
const {FlocktoryInit, FlocktoryPushAttach, FlocktorySetCustomMeta} = require("./floctory/flocktory");
const {httpOK, httpError, checkAuth} = require("./helpers/http");

var app = express();

// Middlewares
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(bearerToken());

/**
 * Token init
 */
app.post('/init',
    checkAuth,
    body('token').not().isEmpty().trim(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return httpError(res, errors.array());
        }

        const token = req.body.token;
        // Flocktory session init
        FlocktoryInit(config.SITE_ID).then((data) => {
            const sessionId = data['site-session-id'];
            // Flocktory attach push token
            FlocktoryPushAttach(token, config.SITE_ID, sessionId, config.SENDER_ID).then((data) => {
                // Set Flocktory crm_id = token
                FlocktorySetCustomMeta(config.SITE_ID, sessionId, token).then((data) => {
                    httpOK(res, data);
                });
            });
        });
    });

app.listen(config.PORT, function () {
    console.log('App listening on port ' + config.PORT);
});