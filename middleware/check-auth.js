const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRETE)
        req.user = decodedtoken
        next()
    } catch (error) {
        res.status(401).send({ 'msg': 'Invalid or expired token', 'error': error })
    }
}
module.exports = { checkAuth }