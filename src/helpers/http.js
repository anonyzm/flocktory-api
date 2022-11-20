const httpError = (res, error, code = 400) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(code)
    res.send(JSON.stringify({
        'error': error,
        'code': code
    }));
}

const httpOK = (res, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
}

module.exports = { httpError, httpOK };