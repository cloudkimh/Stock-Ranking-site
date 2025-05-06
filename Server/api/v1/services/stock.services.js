import statusCode from 'http-status-codes';
import { throwError } from '../../../global/error.handle.js';
import { isEmpty, paginate, pagination, queryFilter } from '../../../global/common.helpers.js';
import { models } from '../../../database/models/index.js';
const { StocklistModel, StockinfoModel, StockdetailModel } = models;

export const stockListServices = async (req, res) => {
    try {
        const { page, limit, offset, where } = await queryFilter({
			query: req?.query,
			strSearchableFields: ['name', 'code'], // string filter column with "req.query.search" parameter
			dateField: 'created_at' // Date filter
		});

        let options = {
            where, offset, limit, order,
            include: [
                {
                    model: StockinfoModel,
                    as: 'stock_info',
                    required: false,
                }
            ],
            // attributes: [],
            // raw: true,
            // logging: console.log,
        }

        let stockListData = await StocklistModel.findAndCountAll(options);
        const result = await pagination(stockListData, page, limit);
        return result;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};

export const stockDetailsServices = async (req, res) => {
    try {
        const { page, limit, offset, where } = await queryFilter({
			query: req?.query,
			strSearchableFields: [], // string filter column with search value
  			intSearchFields: [], // integer filter column with search value
			dateField: 'created_at' // Date filter
		});

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
            // raw: true,
            // logging: console.log,
        }

        let result = await StocklistModel.findOne(options);
        if(isEmpty(result)) {
            throwError(statusCode.BAD_REQUEST, "Stock details not found")    
        }
        return result;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};