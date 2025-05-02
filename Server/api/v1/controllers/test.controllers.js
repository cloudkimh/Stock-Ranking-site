import { createService, findService, createEncryptStringService, createDecryptStringService } from '../services/test.services.js';
import { responseHandler } from '../../../global/response.handle.js';

export const createController = async (req, res, next) => {
    try {
        const data = await createService(req, res);

        let resData = {
            status: true,
            message: "Data created successfully",
            data
        }

        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};

export const findController = async (req, res, next) => {
    try {
        const data = await findService(req, res);

        let resData = {
            status: true,
            message: "Data fetch successfully",
            data
        }

        responseHandler(req, res, resData);
    } catch(error) {
        next(error); 
    }
};

export const createEncryptStringController = async (req, res, next) => {
    try {
        const data = await createEncryptStringService(req, res);

        let resData = {
            status: true,
            message: "Data Encrypted successfully",
            data
        }
        
        res.status(200).json(resData);
    } catch(error) {
        console.log("error encrypted string: ",error);
    }
}

export const createDecryptStringController = async (req, res, next) => {
    try {
        const data = await createDecryptStringService(req, res);

        let resData = {
            status: true,
            message: "Data Decrypted successfully",
            data
        }
        
        res.status(200).json(resData);
    } catch(error) {
        console.log("error Decrypted string: ",error);
    }
}