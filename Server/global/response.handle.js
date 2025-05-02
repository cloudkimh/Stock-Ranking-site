import { IS_ENCRYPTION_USED } from "../constant/settings.js";
import { encryptCBC } from "./encrypt_decrypt.handle.js";

export const responseHandler = async (req, res, resData, statusCode=200) => {
	// let { status, message, data } = resData; 

	let data = {
			status: resData?.status || true,
			message: resData?.message || "success",
			data: resData?.data || {}
	}

	let response = data;
	if(IS_ENCRYPTION_USED == true) {
			response = { "r": await encryptCBC(data) };
	}

	res.status(statusCode).json(response); // add encryption for response
};