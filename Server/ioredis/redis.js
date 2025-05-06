import redis from '../config/ioredis.config.js';
import { IS_REDIS_TEST_CODE } from '../constant/settings.js';

export const initRedis = async () => {
    try {
        if(IS_REDIS_TEST_CODE == true) {
            let testSet = await setCache({key: "test", value: "123"});
            let testGet = await getCache({key: "test"}); 
            console.log("testGet ==>> ",testGet);  
        }
    } catch (error) {
        console.log("Error in initRedis ==>> ",error);
    }
}

export const setCache = async (payload) => {
    const { key, value } = payload;
    await redis.set(key, value);
    return { message: `Key "${key}" set.` };
};

export const getCache = async (payload) => {
    const { key } = payload;
    const value = await redis.get(key);
    return { key, value };
};