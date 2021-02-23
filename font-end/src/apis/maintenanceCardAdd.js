import {API_ENDPOINT} from '../constants/api'
import axiosService from '../utils/axiosService'

export const searchCustomer = (key,page,size) =>{
    let url = `${API_ENDPOINT}/customers?search=${key}&size=${size}&page=${page}`;
    return axiosService.get(url);
}

export const createCustomer = (data) =>{

    let url = `${API_ENDPOINT}/customers`;
    console.log(data)
    return axiosService.post(url,data);
    
}

export const searchRepairman = (key,page,size) =>{
    console.log(key);
    let url = `${API_ENDPOINT}/users/maintenanceCard?page=${page}&size=${size}&key=${key}`;
    return axiosService.get(url);
}

export const searchProduct = (key,page,size) =>{
    let url = `${API_ENDPOINT}/accessories?size=${size}&page=${page}&search=${key}`;

    return axiosService.get(url);
}
export const searchProductByManufactureIdAndCategoriesId = (key,page,size,manufactureId,categoriesId) =>{
    let url = `${API_ENDPOINT}/products/${manufactureId}/${categoriesId}?size=${size}&page=${page-1}&search=${key}`;
    console.log(url);
    return axiosService.get(url);
}

export const createMaintenanceCard = (data) =>{
     
    let url = `${API_ENDPOINT}/maintenanceCards`;
    return axiosService.post(url,data);
}

export const fetchMaintenanceCardById = (id) =>{
    let url = `${API_ENDPOINT}/maintenanceCards/${id}`;
    return axiosService.get(url);
}

export const updateMaintenanceCard = (data) =>{
    console.log(data);
    let url = `${API_ENDPOINT}/maintenanceCards/${data.id}`;
    return axiosService.put(url,data);
}

export const completeCard = (ids) =>{
    let url = `${API_ENDPOINT}/maintenanceCards/workStatus`;
    console.log(ids);
    return axiosService.put(url,ids);
}

export const updateStatusDetail = (id) =>{
    let url = `${API_ENDPOINT}/maintenanceCardDetails/status/${id}`;
    return axiosService.put(url);
}


export const createPaymentHistory = (data) =>{
    let url = `${API_ENDPOINT}/paymentHistories`;
    return axiosService.post(url,data);
}

export const deleteMaintenanceCard = (data) =>{
    let url = `${API_ENDPOINT}/maintenanceCards/${data}`;
    return axiosService.delete(url);
}
export const getSuggestRepairMan = (page,size) =>{
    const api = `${API_ENDPOINT}/maintenanceCards/total?page=${page}&size=${size}`;
    return axiosService.get(api);
}
export const getManufactureList = (page,size,sortBy,descending,params) =>{
    if(page === undefined){
        page = 1;
    }else if(size === undefined){
        size =10;
    }else if(sortBy === undefined){
        sortBy = ""
    }else if(descending === undefined){
        descending =""
    }else if(params === undefined){
        params = ""
    }
    const api = `${API_ENDPOINT}/manufacturer?pageNum=${page}&pageSize=${size}&sortBy=${sortBy}&descending=${descending}&param=${params}`;
    return axiosService.get(api);
}
export const getModelBikeByManufactureId = (id) =>{
    const api = `${API_ENDPOINT}/modelbike/manufactor/${id}`;
    console.log(api);
    return axiosService.get(api);
}

export const getColorBikeByModelBikeId = (id) =>{
    const api = `${API_ENDPOINT}/colorbike/modelBike/${id}`;
    return axiosService.get(api);
}
export const fetchMinTimeLeft = (idEmployee) =>{
    const api = `${API_ENDPOINT}/maintenanceCards/timeLeft/${idEmployee}`;
    return axiosService.get(api);
}
export const getCategories = () =>{
    const api = `${API_ENDPOINT}/category2?size=100`;
    return axiosService.get(api);
}
export const getTopService = () =>{
    const api = `${API_ENDPOINT}/maintenanceCards/topservice`;
    console.log(api)
    return axiosService.get(api);
}
export const getTopProduct = () =>{
    const api = `${API_ENDPOINT}/maintenanceCards/topproduct`;
    return axiosService.get(api);
}