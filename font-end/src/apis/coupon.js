import axiosService from './../utils/axiosService';
import { API_ENDPOINT } from './../constants/api';
const  url = "coupons";
export const getCouponPage= (pageNum,pageSize,sortBy,descending,param) =>{
    let api = `${API_ENDPOINT}/${url}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&param=${param}`;
    return axiosService.get(api);
}
export const addCoupon = (data) =>{
    let api = `${API_ENDPOINT}/${url}`;
    return axiosService.post(api,data);
}
export const updateCoupon = async(data,id) =>{
 
    let api = `${API_ENDPOINT}/${url}/${id}`;
    return axiosService.put(api,data);
}
export const deleteCoupon = ( data) =>{
    let array = [];
    data.forEach(element => {
        array.push(parseInt(element));
    });
    let api = `${API_ENDPOINT}/${url}/delete?listID=${data}`;
    return axiosService.delete(api);
}
export const getItemCoupon = (id) =>{
    return axiosService.get(`${API_ENDPOINT}/${url}/${id}`);
}
 
