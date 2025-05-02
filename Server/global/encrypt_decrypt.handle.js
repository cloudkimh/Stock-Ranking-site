// crypto-helper.ts
import { StatusCodes } from 'http-status-codes';
import CryptoJS from 'crypto-js';
import { throwError } from './error.handle.js';
import { ENCRYPTION_KEY } from '../constant/security_keys.js';


const SECRET_KEY = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY.SECRET_KEY); // 32 characters // 256-bit
const IV = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY.IV); // 16 characters // 128-bit

async function isJsonString(str) {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === 'object' && parsed !== null ? parsed : str;
  } catch (e) {
    return str;
  }
}

// Encrypt
export const encryptCBC = async (data) => {
  try {
    const dataStr = typeof data === "string" ? data : JSON.stringify(data);

    const encrypted = CryptoJS.AES.encrypt(dataStr, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // return encrypted.toString();
    return encodeURIComponent(encrypted.toString()); // Base64 encoded
  } catch (error) {
    throwError(StatusCodes.BAD_REQUEST, "Something went wrong, try after some time");
  }
};

// Decrypt
export const decryptCBC = async (ciphertext) => {
  try {
    // const base64Decoded = ciphertext;
    const base64Decoded = decodeURIComponent(ciphertext);
    const decrypted = CryptoJS.AES.decrypt(base64Decoded, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptStr = decrypted.toString(CryptoJS.enc.Utf8);
    const decrypt = await isJsonString(decryptStr);
    return decrypt;
  } catch (error) {
    throwError(StatusCodes.BAD_REQUEST, "Something went wrong, try after some time");
  }
};
