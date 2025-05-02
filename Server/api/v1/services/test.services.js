import statusCode from 'http-status-codes';
import { encryptCBC, decryptCBC } from '../../../global/encrypt_decrypt.handle.js';
import { throwError } from '../../../global/error.handle.js';
import { models } from '../../../database/models/index.js';
const { TestModel } = models;

export const createService = async (req, res) => {
    try {
        let data = req.body;
        let testCreate = await TestModel.create(data);
        return testCreate;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};

export const findService = async (req, res) => {
    try {
        let testData = await TestModel.findAll();
        // return statusCode;
        if(testData?.length <= 0) {
            throwError(statusCode.NOT_FOUND, "Test not found");
        }
        return testData;
    } catch(error) {
        throwError(error?.statusCode, error?.message);    
    }
};

export const createEncryptStringService = async (req, res) => {
    try {
        let payload = req.body;
        
        let response = {};
        if(payload) {
            response = await encryptCBC(payload);
        }

        return { "string": response }

    } catch(error) {
        throwError(error?.statusCode, error?.message);   
    }
};

export const createDecryptStringService = async (req, res) => {
    try {
        let encrypted_string = req.body.encrypt_string;
        
        let response = {};
        if(encrypted_string) {
            response = await decryptCBC(encrypted_string);
        }

        return { "payload": response }

    } catch(error) {
        throwError(error?.statusCode, error?.message);   
    }
};