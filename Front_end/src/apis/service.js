import { API_ENDPOINT } from "../constants/api"
import axiosService from "../utils/axiosService";

export const getService = (id) => {
    let url = `${API_ENDPOINT}/product/${id}?type=2`;
    return axiosService.get(url);
}

export const createService = (data) => {
    let url = `${API_ENDPOINT}/product`;
    return axiosService.post(url, data);
}

export const updateService = (id, data) => {
    let url = `${API_ENDPOINT}/product/${id}`;
    return axiosService.put(url, data);
}

export const deleteService = (id) => {
    let url = `${API_ENDPOINT}/product/${id}`;
    return axiosService.delete(id);
}