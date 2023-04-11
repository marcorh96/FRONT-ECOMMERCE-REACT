import axios from 'axios';
import { api } from '../Interceptor/authInterceptor'

const URL = 'http://localhost:8080/api';

const getProductPageDataService = async (page) => {
    try {
        const response = await axios.get(URL+`/products/page/${page}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getProductDetail = async (id) =>{
    try {
        const response = await api.get(`/products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    getProductPageDataService,
    getProductDetail
}