import axiosService from '../utils/axiosService';
import { API_ENDPOINT } from '../constants/api';

export const getAccessory = (id) => {
    let url = `${API_ENDPOINT}/product/${id}?type=1`;
    return axiosService.get(url);
};

export const createAccessory = (data) => {
    let url = `${API_ENDPOINT}/product`;
    return axiosService.post(url, data);
}

export const updateAccessory = (id, data) => {
    let url = `${API_ENDPOINT}/product/${id}`;
    return axiosService.put(url, data);
}

export const deleteAccessory = (id) => {
    let url = `${API_ENDPOINT}/product/${id}`;
    return axiosService.delete(url, id);
}