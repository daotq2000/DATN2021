import { API_ENDPOINT } from "../constants/api"
import axiosService from "../utils/axiosService";

export const getProducts = (key, page, size) => {
    let url = `${API_ENDPOINT}/products?search=${key}&page=${page}&size=${size}`;
    return axiosService.get(url);
}

export const deleteProducts = (data) => {
    let url = `${API_ENDPOINT}/products`;
    return axiosService.put(url, data);
}
export const getManufactureList = (page,size,sortBy,descending,params) =>{
    if(page === undefined){
        page = 1;
    }else if(size === undefined){
        size =100;
    }else if(sortBy === undefined){
        sortBy = ""
    }else if(descending === undefined){
        descending =""
    }else if(params === undefined){
        params = ""
    }
    size =100;
    page =1;
    descending = "";
    params="";
    sortBy="";
    const api = `${API_ENDPOINT}/manufacturer?pageNum=${page}&pageSize=${size}&sortBy=${sortBy}&descending=${descending}&param=${params}`;
    return axiosService.get(api);
}
export const getCategories = () =>{
    const api = `${API_ENDPOINT}/category2?size=100`;
    return axiosService.get(api);
}