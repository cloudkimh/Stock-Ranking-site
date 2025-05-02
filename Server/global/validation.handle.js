import statusCode from 'http-status-codes';
import { throwError } from './error.handle.js';

export const atLeastOneFieldRequired = (fieldsToCheck) => {
    return (value, { req }) => {
		const hasAtLeastOneField = fieldsToCheck.some(field => req.body?.[field] !== undefined);
	
		if (!hasAtLeastOneField) {
			throwError(statusCode.BAD_REQUEST, `Please provide at least one valid input`);
		}
	
		return true;
    };
};

export const rejectExtraFields = (allowedFields = []) => {

	let defaultField = "timestamp";
	allowedFields.push(defaultField);
	
	return (req, res, next) => {
		const extraFields = Object.keys(req.body).filter(
			(key) => !allowedFields.includes(key)
		);
		if (extraFields.length > 0) {
			// Use your custom throwError function or pass error to next()
			const message = 'Please provide valid input';
			// return next({ statusCode: statusCode.BAD_REQUEST, message: 'Please provide valid input' });
			throwError(statusCode.BAD_REQUEST, message);
		}
		next();
	};
};