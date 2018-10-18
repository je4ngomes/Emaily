module.exports = (req, res, next) => 
    req.isUnauthenticated() ? 
        res.status(401).send({ error: "You must log in!", auth: false }) : 
        next();