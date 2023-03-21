import axios from "axios";
const API_URL = "http://localhost:8080";

export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
};

export const updateUserById = async (id, userData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, {
        name: userData.name // Only send the updated name property
    });
    return response.data;
};

export const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error in deleteUserById:", error.response || error);
        throw error;
    }
};