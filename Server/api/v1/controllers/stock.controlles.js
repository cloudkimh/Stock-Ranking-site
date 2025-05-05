import { stockDetailsServices, stockListServices } from '../services/stock.services.js';
import { responseHandler } from '../../../global/response.handle.js';

export const stockListController = async (req, res, next) => {
    try {
        const data = await stockListServices(req, res);

        let resData = {
            status: true,
            message: "Stock list fetched successfully",
            data
        }

        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};

export const stockDetailsController = async (req, res, next) => {
    try {
        const data = await stockDetailsServices(req, res);

        let resData = {
            status: true,
            message: "Stock list fetched successfully",
            data
        }

        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};