import { API_ENDPOINT } from "../constants/api"
import axiosService from "../utils/axiosService";
const url = "v2/services";
export const getItemService = (id) => {
     return axiosService.get(`${API_ENDPOINT}/${url}/${id}`);
}

export const createService = (data) => {
    let api = `${API_ENDPOINT}/${url}`;
    return axiosService.post(api,data);
}

export const updateService = (idService, data) => {
    let api = `${API_ENDPOINT}/${url}/${idService}`;
    console.log("qưerfsdgs",data);
    return axiosService.put(api,data);
}

export const deleteService = (data) => {
    let array = [];
    data.forEach(element => {
        array.push(parseInt(element));
    });
    let api = `${API_ENDPOINT}/${url}/delete?listID=${data}`;
    return axiosService.delete(api);
}
export const getListService= (pageNum,pageSize,sortBy,descending,param) =>{
    let api = `${API_ENDPOINT}/${url}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&param=${param}`;
    console.log(url);
    return axiosService.get(api)
}