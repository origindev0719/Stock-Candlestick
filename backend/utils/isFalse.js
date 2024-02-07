import { isEmpty } from 'ramda';

export default (value, errorMessage = null) => {
    if (!errorMessage) {
        if (isEmpty(value) || !value) {
            return true;
        }
        return false;
    }
    if (isEmpty(value) || !value) {
        throw new Error(errorMessage);
    }
    return false;
};
