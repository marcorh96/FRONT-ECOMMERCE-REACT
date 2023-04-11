import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RoleGuard = ({ children, requiredRoles }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.role || !requiredRoles.includes(user.role)) {
        Swal.fire('Access Denied', 'You dont have a required role to access!', 'error')
            .then(() => {
                navigate('/');
            })
        return;
    }
    return children;
};

export default RoleGuard;
