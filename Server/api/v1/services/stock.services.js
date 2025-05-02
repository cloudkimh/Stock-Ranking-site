import statusCode from 'http-status-codes';
import { encryptCBC, decryptCBC } from '../../../global/encrypt_decrypt.handle.js';
import { throwError } from '../../../global/error.handle.js';
import { isEmpty, paginate, pagination } from '../../../global/common.helpers.js';
import { ROLE } from '../../../constant/index.js';
import { models } from '../../../database/models/index.js';
const { StocklistModel, StockinfoModel, StockdetailModel } = models;

export const stockListServices = async (req, res) => {
    try {
        let page = parseInt(req?.query?.page) || 1;
        let limit = parseInt(req?.query?.limit) || 10;

        let { code } = req.query;

        // filter
        let where = {};
        if(code) {
            where.code = code;
        }

        let { offset } = await paginate(page, limit);

        let options = {
            where,
            // attributes: [],
            include: [
                {
                    model: StockinfoModel,
                    as: 'stock_info',
                    required: false,
                },
                {
                    model: StockdetailModel,
                    as: 'stock_detail',
                    required: false,
                }
            ],
            order: [
                ['created_at', 'DESC'],
                ['updated_at', 'DESC']
            ],
            offset,
            limit,
            // raw: true
        }

        let stockListData = await StocklistModel.findAndCountAll(options);

        const result = await pagination(stockListData, page, limit);

        // if(isEmpty(result)) {
        //     throwError(statusCode.NOT_FOUND, "Account not found")
        // }

        return result;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};