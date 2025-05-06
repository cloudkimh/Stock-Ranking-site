import statusCode from 'http-status-codes';
import { throwError } from './error.handle.js';
import { query } from 'express-validator';

export const paginationValidator = [
	query('page')
		.optional()
		.trim()
        // .notEmpty().withMessage('Page is required')
		.isInt({ min: 1 }).withMessage('Page must be number greater than 0'),

	query('limit')
		.optional()
		.trim()
        // .notEmpty().withMessage('Limit is required')
		.isInt({ min: 1 }).withMessage('Limit must be number greater than 0'),

    query('start_date')
		.optional()
		.trim()
		.isISO8601().withMessage('Start date is invalid'),

	query('end_date')
		.optional()
		.trim()
		.isISO8601().withMessage('End date is invalid'),
];

export const atLeastOneFieldRequired = (fieldsToCheck) => {
    return (value, { req }) => {
		let payload = req.method == "GET" ? req.query : req.body;
		const hasAtLeastOneField = fieldsToCheck.some(field => payload?.[field] !== undefined);
	
		if (!hasAtLeastOneField) {
			throwError(statusCode.BAD_REQUEST, `Please provide at least one valid input`);
		}
	
		return true;
    };
};

export const rejectExtraFields = (allowedFields = []) => {
    const defaultFields = ["timestamp", "search"];
    let fieldsToCheck = [...allowedFields, ...defaultFields];

    return (req, res, next) => {
        if(req?.method == "GET") {
			fieldsToCheck = [ 'page', 'limit', 'search', 'start_date', 'end_date', ...fieldsToCheck ];
            if (req?.query && typeof req?.query === 'object') {
                const extraQueryFields = Object.keys(req.query).filter(
                    (key) => !fieldsToCheck.includes(key)
                );
    
                if (extraQueryFields.length > 0) {
                    const message = 'Please provide valid parameter';
                    return throwError(statusCode.BAD_REQUEST, message);
                }
            } else {
                const message = 'Required parameter is missing';
                return throwError(statusCode.BAD_REQUEST, message);
            }
        } else {
            if (req?.body && typeof req?.body === 'object') {
                const extraBodyFields = Object.keys(req.body).filter(
                    (key) => !fieldsToCheck.includes(key)
                );
    
                if (extraBodyFields.length > 0) {
                    const message = 'Please provide valid payload';
                    return throwError(statusCode.BAD_REQUEST, message);
                }
            } else {
                const message = 'Required payload is missing';
                return throwError(statusCode.BAD_REQUEST, message);
            }
        }
        next();
    };
};