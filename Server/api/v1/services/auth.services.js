import statusCode from 'http-status-codes';
import { encryptCBC, decryptCBC } from '../../../global/encrypt_decrypt.handle.js';
import { throwError } from '../../../global/error.handle.js';
import { isEmpty, generateJWToken } from '../../../global/common.helpers.js';
import { ROLE } from '../../../constant/index.js';
import { models } from '../../../database/models/index.js';
const { UserModel } = models;

export const loginServices = async (req, res) => {
    try {
        let { user_unique_id, password } = req.body;
        password = await encryptCBC(password);

        let userData = await UserModel.findOne({
            where: {
                user_unique_id,
                password,
                role: ROLE.SUPERADMIN 
            },
            attributes: ['id', 'user_unique_id', 'nick_name', 'phone', 'email', 'role'],
            raw: true
        })

        if(isEmpty(userData)) {
            throwError(statusCode.NOT_FOUND, "Account not found")
        }

        let token = await generateJWToken(userData);

        res.cookie('admin_auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return userData;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};

export const logoutServices = async (req, res) => {
    try {
        res.clearCookie('admin_auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return true;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};