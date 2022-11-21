const config = require('../config/constants');

/**
 * Returns http error
 * @param res
 * @param error
 * @param code
 */
const httpError = (res, error, code = 400) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(code)
    res.send(JSON.stringify({
        'errors': error,
        'code': code
    }));
}

/**
 * Returns valid http response
 * @param res
 * @param data
 */
const httpOK = (res, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}

/**
 * Authentification middleware
 * @param req
 * @param res
 * @param next
 */
const checkAuth = (req, res, next) => {
    if (config.AUTH_TOKEN === req.token) {
        next();
    } else {
        httpError(res, 'Unauthorized', 403);
    }
}

module.exports = {httpError, httpOK, checkAuth};