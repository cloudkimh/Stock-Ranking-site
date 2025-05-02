import { body, validationResult } from 'express-validator';
import { throwError, InvalidParameter } from '../../../../global/error.handle.js';
import { atLeastOneFieldRequired } from '../../../../global/validation.handle.js';

let fieldsToCheckAry = ['name']; 

export const testValidator = [
	body().custom(atLeastOneFieldRequired(fieldsToCheckAry)),

    // body('id')
    //   .trim()
    //   .notEmpty().withMessage('id is required')
    //   .isString().withMessage('id must be a string'),

    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),


    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errRes = await InvalidParameter(req, res, errors.array());
            throwError(errRes?.statusCode, errRes?.message);
        }
        next();
    }
]