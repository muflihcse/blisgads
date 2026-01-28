import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('adminToken') === 'true';
    });
    const navigate = useNavigate();

    
    useEffect(() => {
        const checkAdmin = () => {
            setIsAdmin(localStorage.getItem('adminToken') === 'true');
        };

        
        checkAdmin();

        
        window.addEventListener('storage', checkAdmin);
        return () => window.removeEventListener('storage', checkAdmin);
    }, []);

    const login = (email, password) => {
        
        if (email === 'admin@bliszgads.com' && password === 'admin123') {
            localStorage.setItem('adminToken', 'true');
            setIsAdmin(true);
            toast.success('Login successful!');
            navigate('/admin/dashboard');
            return true;
        } else {
            toast.error('Invalid credentials');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAdmin(false);
        toast.info('Logged out');
        navigate('/login');
    };

    return { isAdmin, login, logout };
};
