var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const {flocktoryInit, flocktoryPushAttach} = require("./floctory/flocktory");
const {httpOK, httpError} = require("./helpers/http");

const PORT = 3001;

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

/**
 * Index
 */
app.get('/', function (req, res) {
    httpOK(res, {
        'title': 'Floctory API v1',
        'endpoints': {
            '/init': 'Application init',
            '/push-init': 'Attaching push session ID'
        }
    });
});

/**
 * App init
 */
app.post('/init', function (req, res) {
    const params = req.body;
    console.log(params)
    if (!params.siteId) {
        return httpError(res, 'You must specify following params: `siteId`');
    }
    flocktoryInit(params.siteId).then((data) => {
        httpOK(res, data);
    });
});

/**
 * Push attach to session
 */
app.post('/push-init', function (req, res) {
    const params = req.body;
    if (!params.token || !params.siteId || !params.sessionId || !params.senderId) {
        return httpError(res, 'You must specify following params: `token`, `siteId`, `sessionId`, `senderId`');
    }
    flocktoryPushAttach(params.token, params.siteId, params.sessionId, params.senderId).then((data) => {
        httpOK(res, data);
    });
});

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT + '!');
});