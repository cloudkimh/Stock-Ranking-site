import { loginServices, logoutServices } from '../services/auth.services.js';
import { responseHandler } from '../../../global/response.handle.js';

export const loginController = async (req, res, next) => {
    try {
        const data = await loginServices(req, res);

        let resData = {
            status: true,
            message: "Login successfully",
            data
        }

        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};

export const logoutController = async (req, res, next) => {
    try {
        const data = await logoutServices(req, res);

        let resData = {
            status: true,
            message: "Logout successfully"
        }
        
        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};