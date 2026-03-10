import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/api/auth/register', userData),
    login: (userData) => api.post('/api/auth/login', userData),
    getUser: () => api.get('/api/auth/user'),
};

// Properties API calls
export const propertiesAPI = {
    getProperties: (params) => api.get('/api/properties', { params }),
    getProperty: (id) => api.get(`/api/properties/${id}`),
    createProperty: (formData) => api.post('/api/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    updateProperty: (id, formData) => api.put(`/api/properties/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    deleteProperty: (id) => api.delete(`/api/properties/${id}`),
    getUserProperties: (userId) => api.get(`/api/properties/user/${userId}`),
    getFeaturedProperties: () => api.get('/api/properties/featured'),
    searchProperties: (params) => api.get('/api/properties/search', { params }),
};

// Bookmarks API calls
export const bookmarksAPI = {
    getBookmarks: () => api.get('/api/bookmarks'),
    toggleBookmark: (propertyId) => api.post('/api/bookmarks', { propertyId }),
    checkBookmark: (propertyId) => api.get(`/api/bookmarks/check/${propertyId}`),
};

// Messages API calls
export const messagesAPI = {
    getMessages: () => api.get('/api/messages'),
    sendMessage: (messageData) => api.post('/api/messages', messageData),
    markAsRead: (id) => api.put(`/api/messages/${id}`),
    deleteMessage: (id) => api.delete(`/api/messages/${id}`),
    getUnreadCount: () => api.get('/api/messages/unread-count'),
};

export default api;