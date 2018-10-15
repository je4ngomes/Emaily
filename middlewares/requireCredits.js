const { isNotGreaterThanOrEqualTo } = require('../helpers/helpers');

module.exports = (min=1) => ({ user: { credits } }, res, next) => {
    isNotGreaterThanOrEqualTo(min, credits) ? 
        res.status(403).send({ error: "You do not have enough credits to perform this operation" }) :
        next();
};

