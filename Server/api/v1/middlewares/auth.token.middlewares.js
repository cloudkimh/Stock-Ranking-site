import jwt from 'jsonwebtoken';
import statusCode from 'http-status-codes';
import { throwError } from '../../../global/error.handle.js';
import { verifyJWToken } from '../../../global/common.helpers.js';

export const authToken = async (req, res, next) => {
    try {
        const token = req?.cookies?.admin_auth_token; // Replace with your cookie name
        if (!token) {
            throwError(statusCode.UNAUTHORIZED, 'Token missing');
        }

        const decoded = verifyJWToken(token); // Use same secret used in generateJWToken
        req.user = decoded; // Add user info to request

        next(); // Proceed to next middleware or route
    } catch (error) {
        throwError(error?.statusCode, error?.message);
    }
}