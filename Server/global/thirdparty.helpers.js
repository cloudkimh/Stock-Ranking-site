import { OPEN_API_BASE_URL } from "../constant/public.constant.js";
import axios from "axios";

/* *** Third party start *** */
export const ThirdPartyApiCall = async (url,body,header) => {
   try {
      const response = await axios.post(
         `${OPEN_API_BASE_URL}/${url}`,
         {
            ...body
         },
         {
            headers: {
               'Content-Type': 'application/json;charset=UTF-8',
               ...header
            },
         }
      );
      return response;
   } catch (error) {
      console.log("Error in ThirdPartyApiCall ==>> ",error);
   }
}