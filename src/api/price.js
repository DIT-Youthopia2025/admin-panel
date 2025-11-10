import axios from "axios"
import baseConfig from './base_url.json' assert { type: 'json' };

const base_url = baseConfig.base_url;

const token = localStorage.getItem("token");

export const createPrice = async (data) => {
    const res = await axios.post(`${base_url}/prices/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res;
}