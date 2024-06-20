import axios from "axios";

const api = axios.create({
    baseURL: "https://harmonized-crop-calendar1.onrender.com/",
});

export default api