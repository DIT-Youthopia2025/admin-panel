import axios from "axios"
import baseConfig from './base_url.json' assert { type: 'json' };

const base_url = baseConfig.base_url;


export const createPrice = async (data) => {
    const res = await axios.post(`${base_url}/prices/create`, data, {
        withCredentials: true
    })
    return res;
}