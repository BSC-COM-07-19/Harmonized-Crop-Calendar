import axios from "axios";

/**
 * Create an instance of axios with a custom configuration.
 * This instance is configured to communicate with the backend server.
 *
 * Features:
 * - Base URL for the deployed backend server is set to "https://harmonized-crop-calendar1.onrender.com".
 * - Uncomment the local baseURL line and comment the deployed baseURL line for local development.
 *
 * Usage:
 * - Import this configured axios instance in other parts of the application to make HTTP requests.
 *
 */
const api = axios.create({

    // baseURL: "http://localhost:8000",

    // Base URL for the deployed backend server
    baseURL: "https://harmonized-crop-calendar1.onrender.com"
});

// Export the configured axios instance for use in other parts of the application
export default api;
