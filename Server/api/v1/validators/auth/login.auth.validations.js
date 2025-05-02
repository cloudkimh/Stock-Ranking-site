import { body, validationResult } from 'express-validator';
import { throwError, InvalidParameter } from '../../../../global/error.handle.js';
import { atLeastOneFieldRequired, rejectExtraFields } from '../../../../global/validation.handle.js';

let allowedFieldsAry = ['user_unique_id', 'password']; 
// let fieldsToCheckAry = ['user_unique_id', 'password']; 

export const loginValidator = [
  	rejectExtraFields(allowedFieldsAry),

	// body().custom(atLeastOneFieldRequired(fieldsToCheckAry)),

    body('user_unique_id')
      .trim()
      .notEmpty().withMessage('User unique id is required')
      .isString().withMessage('User unique id must be a string'),

    body('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .isString().withMessage('Password must be a string'),


    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errRes = await InvalidParameter(req, res, errors.array());
            throwError(errRes?.statusCode, errRes?.message);
        }
        next();
    }
]