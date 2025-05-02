import statusCode from 'http-status-codes';
import { decryptCBC } from "./encrypt_decrypt.handle.js";
import { throwError } from "./error.handle.js";
import { IS_ENCRYPTION_USED, IS_TIMESTAMP_USED } from "../constant/settings.js";

const isWithin30Seconds = async (timestamp) => {
  const currentTimestamp = Date.now(); // current timestamp in milliseconds
  const diffInSeconds = Math.abs(currentTimestamp - timestamp) / 1000;
  return diffInSeconds <= 30;
};

export const preRequestHandler = async (req, res, next) => {
    // console.log('Request URL:', req.originalUrl);
    // console.log('Request Method:', req.method);
    // console.log('Request Headers:', req.headers);
    // console.log('Request body:', req.body);
    // console.log('Request query:', req.query);

    const method = req.method;
    if(IS_ENCRYPTION_USED == true) {
      if(method && method == "GET") {
        let query = req?.query?.q;
        if(query) {
          let decryptReq = await decryptCBC(query);
          req.query = decryptReq;
        }
      } 
      else {
        let payload = req?.body?.p;
        if(payload) {
          let decryptReq = await decryptCBC(payload);
          req.body = decryptReq;
        }
      }
    }
    // console.log('Request body:', req.body);

    if(IS_TIMESTAMP_USED == true) {
      // user for check 1 min 
      const timestamp = method == "GET" ? req?.query?.timestamp : req?.body?.timestamp;
      // console.log("timestamp ===>> ",Date.now(), await isWithin30Seconds(timestamp));
      if(timestamp) {
        let checkTime = await isWithin30Seconds(timestamp);
        if (!checkTime) {
          throwError(statusCode.FORBIDDEN, "Forbidden");
        }
      } else {
        throwError(statusCode.BAD_REQUEST, "Required payload is missing");
      }
    } 
    next();
};