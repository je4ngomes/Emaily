import validator from 'validator';
import * as R from 'ramda';
import moment, { now } from 'moment'

const validate = {
    email: value => R.compose(
                        (data) => ({ data, valid: R.isEmpty(data) }),
                        R.takeWhile((email) => R.not(validator.isEmail(email))), 
                        R.map(R.trim), 
                        R.split(','))(value)
};

const isEmpty = R.compose(R.isEmpty, R.trim);

const validField = ({ type, value }) => {
    const validator = R.prop(type, validate) || R.always({ valid: true });
    const validated = validator(value);
    
    return isEmpty(value) ? { valid: false } : validated;

};

export default validField;

