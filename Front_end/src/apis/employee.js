import { API_ENDPOINT } from '../constants/api';
import axiosService from '../utils/axiosService';
import axios from  "axios";
const url = "users";
let token = localStorage.getItem('Authorization');


export const getEmployee= (pageNum,pageSize,sortBy,descending,param) =>{
    console.log(token);

    let api = `${API_ENDPOINT}/${url}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&param=${param}`;
    return axiosService.get(api);
}
export const addEmployee = (data) =>{
    let api = `${API_ENDPOINT}/${url}`;
    return axios.post(api,data);
}
export const updateEmployee = async(data,id) =>{
    console.log(data,id);
    let api = `${API_ENDPOINT}/${url}/${id}`;
    return axios.put(api,data);
}
export const deleteEmployee = ( data) =>{
    let array = [];
    data.forEach(element => {
        array.push(parseInt(element));
    });
    let api = `${API_ENDPOINT}/${url}/delete?listID=${data}`;
    return axios.delete(api);
}
export const getItemEmployee = (id) =>{
    return axios.get(`${API_ENDPOINT}/${url}/${id}`);
}
export const changePassword = (data) =>{
    let api = `${API_ENDPOINT.substring(0,21)}/${url}/changePassword`;
    return axios.put(api,data);
}
export const getmaintenanceCardByIdUser = (id,pageNum,pageSize,sortBy,descending,code) =>{
    let api = `${API_ENDPOINT}/${url}/maintenanceCards/${id}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&code=${code}`;
    console.log(api);
    return axios.get(api);
} 
