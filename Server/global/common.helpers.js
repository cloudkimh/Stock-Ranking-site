import { Op, where as sequelizeWhere, cast, col } from 'sequelize';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constant/security_keys.js';

/* *** JWT start *** */
export const generateJWToken = async (data) => {
    const payload = {
        id: data.id,
        user_unique_id: data.user_unique_id,
        role: data.role
    };

    // Generate and return the token
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: '24h' // Token expires in 24 hour
    });
}

export const verifyJWToken = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded;
}
/* *** JWT enddd *** */

/* *** build dynamic where caluse for sequelize query - start *** */
export const queryFilter = async ({ query = {}, strSearchableFields = [], intSearchFields = [], dateField = 'created_at' }) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;
    const { search, start_date, end_date, ...filters } = query;
    // console.log("filter request ===>> ", {...query, strSearchableFields, intSearchFields, dateField});
    
    const where = {};
    
    // Apply dynamic filters (excluding known keys)
    const notIncludeInFilterAry = ['page', 'limit', 'search', 'start_date', 'end_date', ...strSearchableFields, ...intSearchFields];
    for (const key in filters) {
      if (!notIncludeInFilterAry.includes(key) && filters[key]) {
        where[key] = filters[key];
      }
    }
  
    // Apply global search filter
    /*if (search && strSearchableFields.length > 0) {
      where[Op.or] = strSearchableFields.map(field => ({
        [field]: { [Op.iLike]: `%${search}%` }
      }));
    }*/
    if (search && strSearchableFields.length > 0) {
        where[Op.or] = strSearchableFields.map(field => {
        if (intSearchFields.includes(field)) {
            return sequelizeWhere(
                cast(col(field), 'TEXT'),
                { [Op.iLike]: `%${search}%` }
            );
        }
        return {
            [field]: { [Op.iLike]: `%${search}%` }
        };
        });
    }

    // Date range filter
    if (start_date || end_date) {
        where[dateField] = {};
        if (start_date) where[dateField][Op.gte] = new Date(start_date);
        if (end_date) where[dateField][Op.lte] = new Date(end_date);
    }
    
	// console.log("filter ===>> ", page, limit, offset, where);
    return {
      page,
      limit,
      offset,
      where
    };
}
/* *** build dynamic where caluse for sequelize query - enddd *** */

/* *** Pagination start *** */
export const paginate = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return { limit, offset };
}

export const pagination = async (data, page = 1, limit = 10) => {
    const totalCount = data.count;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Number(page);
  
    return {
      count: totalCount,
      limit,
      page: currentPage,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      rows: data.rows,
    };
}

/* *** Pagination enddd *** */

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)
    );
}

export const valueConvertIntoInteger = async (data, intKeys) => {
    for (const key in data) {
        const val = data[key];
        if (val === '') {
            data[key] = null;
        } else if (intKeys.includes(key)) {
            const num = parseInt(String(val).replace(/[^\d-]/g, ''), 10);
            data[key] = isNaN(num) ? null : num;
        }
    }

    return data;
}