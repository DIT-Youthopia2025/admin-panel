import axios from "axios"
import baseConfig from './base_url.json' assert { type: 'json' };

const base_url = baseConfig.base_url;

export const login = async ({data}) => {
    const res = await axios.post(`${base_url}/admins/login-admin`, data)
    return res
}