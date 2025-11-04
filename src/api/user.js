import axios from "axios"
import {base_url} from './base_url.json' assert { type: 'json' };

export const login = async ({data}) => {
    const res = await axios.post(`${base_url}/admins/login-admin`, data)
    return res
}