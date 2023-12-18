import axios from "axios";


const api = axios.create({ baseURL: "https://fakestoreapi.com" })

api.interceptors.response.use(res => res.data, error => Promise.reject(error))

const getProducts = async () => {
    try {
        const response = await api.get(`/products`);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export { getProducts };