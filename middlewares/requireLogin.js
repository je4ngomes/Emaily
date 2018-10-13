module.exports = (req, res, next) => 
    req.isAuthenticated ? 
        res.status(401).send({ error: "You must log in!" }) : 
        next();