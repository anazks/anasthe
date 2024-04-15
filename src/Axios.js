import axios from "axios";

const instance = axios.create({
    baseURL: 'https://statusboard.onrender.com',
  });

export default instance