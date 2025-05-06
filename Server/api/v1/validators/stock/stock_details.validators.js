import { query, validationResult } from 'express-validator';
import { throwError, InvalidParameter } from '../../../../global/error.handle.js';
import { atLeastOneFieldRequired, rejectExtraFields } from '../../../../global/validation.handle.js';

let allowedFieldsAry = ['id', 'code']; 
let fieldsToCheckAry = ['id', 'code']; 

export const stockDetailsValidator = [
    rejectExtraFields(allowedFieldsAry), // Max allow field
    query().custom(atLeastOneFieldRequired(fieldsToCheckAry)), // Min allow field
    // ...paginationValidator,

    query('id')
        .optional()
        .trim()
        .isString().withMessage('Id must be a string'),

    query('code')
        .optional()
        .trim()
        .isString().withMessage('Code must be a string'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errRes = await InvalidParameter(req, res, errors.array());
            throwError(errRes?.statusCode, errRes?.message);
        }
        next();
    }
]