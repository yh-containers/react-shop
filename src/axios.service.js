import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8082/api.php/',
    timeout: 2000,
    // headers: { 'X-Custom-Header': 'foobar' }
});