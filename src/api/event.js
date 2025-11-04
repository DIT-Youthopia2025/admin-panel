import axios from "axios"

const base_url = "http://localhost:3001/api"

export const createEvent = async (data) => {
    const res = await axios.post(`${base_url}/events`, data)
    return res
}