import React from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your backend URL if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;