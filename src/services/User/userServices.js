import axios from 'axios';
import { api } from '../Interceptor/authInterceptor'

const getUserDataService = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await api.get(`/users/${userId}`);
        return response;
    } catch (error) {

        throw error;
    }
}

const saveUserImageService = async (photo) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('id', userId);
        const response = await api.post('/users/upload', formData);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateUserService = async (userFormData) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await api.put(`/users/${userId}`, userFormData);
        return response;
    } catch (error) {
        throw error.response.data.errors;
    }
}

const updateUserPassword = async (userFormData) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await api.put(`/users/${userId}/password`, userFormData);
        return response;
    } catch (error) {
        throw error.response.data.errors;
    }
}

export {
    getUserDataService,
    saveUserImageService,
    updateUserService,
    updateUserPassword
} 