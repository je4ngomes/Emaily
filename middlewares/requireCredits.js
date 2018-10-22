const { isNotGreaterThanOrEqualTo } = require('../helpers/helpers');

module.exports = ({ user: { credits } }, res, next) => {
    credits < 1 ? 
        res.status(403).send({ error: "You do not have enough credits to perform this operation" }) :
        next();
};

