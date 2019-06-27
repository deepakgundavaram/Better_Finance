module.exports = ((err, req, res, next) => {
    res.status(400).send("Internal Server Error, please try again later");
});