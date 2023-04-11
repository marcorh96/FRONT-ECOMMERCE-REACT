import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    if (!localStorage.getItem('token')) {
        Swal.fire('Access denied', 'Are you logged in?', 'error')
            .then(() => {
                navigate('/login');
            });
        return;
    }
    return children;
};

export default AuthGuard;
