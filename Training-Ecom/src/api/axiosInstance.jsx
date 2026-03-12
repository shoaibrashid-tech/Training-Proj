import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Sending Request: ${config.method} ${config.url}`);
        return(config);

    }, (error) =>error)

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export default api;
