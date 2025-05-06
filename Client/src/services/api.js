import axiosInstance from '../lib/axios';
import endpoints from './endpoints';

// Generic API functions
const api = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
    patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
};

// Specific service functions
export const stockServices = {
    stockList: (params = {}) => api.get(endpoints.stock.stockList, { params }),
};

//example
// export const userService = {
//   getAllUsers: (params = {}) => api.get(endpoints.users.getAll, { params }),
//   getUserById: (id) => api.get(endpoints.users.getById(id)),
//   updateUser: (id, userData) => api.put(endpoints.users.update(id), userData),
//   deleteUser: (id) => api.delete(endpoints.users.delete(id)),
// };


export default api;