//send the jwt to the the middleware and checks if this id user has access
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //client sends the token in the header and gets checked
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).send("Access Denied, Invalid Token");

    //returns the decoded payload of verified user's token and throws exception if error
    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload  //saving the current user
    } catch (err) {
        res.status(400).send("Invalid Token")
    }

    next();
}