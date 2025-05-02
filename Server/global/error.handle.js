import { IS_ENCRYPTION_USED } from "../constant/settings.js";
import { encryptCBC } from "./encrypt_decrypt.handle.js";

export const errorHandler = async (err, req, res, next) => {
    // console.error("errorHandler err ==>> ",err);
    let statusCode = err?.statusCode || 500;
    let message = err?.message || "Something is wrong";
  
    let data = { 
      status: false,
      message,
      // errorMessage: ""
    }

    if(process.env.NODE_ENV == "development") {
      data.stack = err?.stack; 
    }

    let response = data;
    if(IS_ENCRYPTION_USED == true) {
      response = { "r": await encryptCBC(data) };
    }
  
    res.status(statusCode).json(response); // add encryption function for response
};

// export const throwError = (statusCode, message) => {
//   throw Object.assign(new Error(message), { statusCode });
// };

export const throwError = (statusCode = 500, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export const InvalidParameter = async (req, res, errors) => {
  const errors_array = errors.map((error) => ({ msg: error.msg }));

  const errRes = {
    statusCode: 400,
    message: errors_array[0]?.msg ?? "Required payload missing",
    // data: errors_array
  };

  return errRes;
}