import axios from "axios";

import { AuthResponce } from "../models/response/AuthResponse";

export const API_URL = 'http://att24.altyntulpar.kg/api'

export const API_TASKS = 'http://192.168.2.26:35421/itil_demo/hs/API'

let indexTry = 0;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = ` ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && indexTry <= 3) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponce>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accesToken);
            return $api.request(originalRequest);
        } catch (e) {
            indexTry = indexTry + 1;
            console.log(e);
        }
    }

    throw error;
})



export default $api
