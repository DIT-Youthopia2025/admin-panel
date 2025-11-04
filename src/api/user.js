import axios from "axios"

const base_url = "http://localhost:3001/api"

export const login = async ({data}) => {
    const res = await axios.post(`${base_url}/admins/login-admin`, data)
    return res
}