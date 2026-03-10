import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth/user');
            setUser(res.data);
        } catch (err) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await loadUser();
    };

    const register = async (username, email, password) => {
        const res = await axios.post('/api/auth/register', { username, email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await loadUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};