import axios from "axios"
import {base_url} from './base_url.json' assert { type: 'json' };

export const createPrice = async (data) => {
    const res = await axios.post(`${base_url}/prices/create`, data, {
        withCredentials: true
    })
    return res;
}