
//components/Global/API_ENDPOINTS.jsx
export const BASE_URL = 'https://localhost:7157/api/User';
export const API_ENDPOINTS = {
    getAllUsers: `${BASE_URL}/getAllUsers`,
    deactivateUser: (id) => `${BASE_URL}/deactivateUser/${id}`,
    restoreUser: (id) => `${BASE_URL}/restoreUser/${id}`,
    updateUser: (id) => `${BASE_URL}/updateUsers/${id}`,
};
