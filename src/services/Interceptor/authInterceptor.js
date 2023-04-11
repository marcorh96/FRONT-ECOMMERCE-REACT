import axios from 'axios';
import { logout } from '../services';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
        } else if (error.response && error.response.status === 403) {
            Swal.fire('Forbidden', 'You dont have permission to access this resource', 'error')
                .then(() => {
                    window.location = '/';
                });
        } 
        return Promise.reject(error);
    }
); 

export {
    api
}

