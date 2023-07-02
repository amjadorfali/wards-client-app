import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_INTERNAL_API_HOST,
	timeout: 1000,
	headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
