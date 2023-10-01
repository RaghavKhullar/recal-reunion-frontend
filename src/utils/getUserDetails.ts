import axios from 'axios';
export const getUserDetails = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getDetails`,{ withCredentials: true });
    return response.data;
}