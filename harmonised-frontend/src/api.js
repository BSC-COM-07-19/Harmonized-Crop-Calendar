import axios from "axios";



/**
 * Axios instance configured for interacting with the backend API.
 * @type {import("axios").AxiosInstance}
 */
const api = axios.create({

    // baseURL: "http://localhost:8000",

    // Base URL for the deployed backend server
    baseURL: "https://harmonized-crop-calendar1.onrender.com"
});

// Export the configured axios instance for use in other parts of the application
export default api;
