const notArray = (recipients) => !Array.isArray(recipients);
const strToObj = (recipients) => 
    notArray(recipients) ? 
        recipients.split(',').map(email => ({ email: email.trim() })) :
        recipients;

const isNotGreaterThanOrEqualTo = (x, y) => !(x >= y);

module.exports = {
    strToObj,
    isNotGreaterThanOrEqualTo
};