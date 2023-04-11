import axios from 'axios';



const URL = 'http://localhost:8080/api'

const loginService = async (email, password) => {
    try {
        const response = await axios.post(URL + '/users/login', {
            email,
            password,
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.user.token);
        return response.data.user;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const signUpService = async (userData) => {
    try {
        const response = await axios.post(URL + '/users/signup', userData);
        return response;
    } catch (error) {
        throw error.response.data.errors;
    }
}

const logout = () => {
    localStorage.clear();
    window.location = '/login';
}



export {
    loginService,
    signUpService,
    logout
}
