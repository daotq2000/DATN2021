import * as serviceConstant from '../constants/service';
export const actFetchDataService = (pageNum,pageSize,sortBy,descending,param) =>{
    return{
        type: serviceConstant.FETCH_ALL_SERVICE ,
        payload:{pageNum,pageSize,sortBy,descending,param}
    }
}
export const actFetchDataServiceSuccess = (data) =>{
    return{
        type:serviceConstant.FETCH_ALL_SERVICE_SUCCESS,
        payload:{data}
    }
}
export const actFetchDataServiceFailed = (data) =>{
    return{
        type:serviceConstant.FETCH_ALL_SERVICE_FAILED,
        payload:{data}
    }
}
export const actGetItemService = (id) => {
    return {
        type: serviceConstant.GET_SERVICE,
        payload: { id }
    }
}
export const actGetItemServiceSuccess = (data) =>{
    return{
        type:serviceConstant.GET_SERVICE_SUCCESS,
        payload:{
            data
        }
    }
}
export const actGetItemServiceFailed = (data) =>{
    return{
        type:serviceConstant.GET_SERVICE_FAIL,
        payload:{
            data
        }
    }
}
export const actCreateService =(data)=>{
    return{
     type:serviceConstant.CREATE_SERVICE,
     payload:{
         data
     }
    }
 }
 export const actCreateServiceSuccess =(data)=>{
    return{
     type:serviceConstant.CREATE_SERVICE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actCreateServiceFailed =(data)=>{
    return{
     type:serviceConstant.CREATE_SERVICE_FAIL,
     payload:{
         data
     }
    }
 }
 export const actUpdateService =(idService,data)=>{
    return{
     type:serviceConstant.UPDATE_SERVICE,
     payload:{
         data,idService
     }
    }
 }
 export const actUpdateServiceSuccess =(data)=>{
    return{
     type:serviceConstant.UPDATE_SERVICE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateServiceFailed =(data)=>{
    return{
     type:serviceConstant.UPDATE_SERVICE_FAIL,
     payload:{
         data
     }
    }
 }
 export const actDeleteService =(data)=>{
    return{
     type:serviceConstant.DELETE_SERVICE,
     payload:{
         data
     }
    }
 }
 export const actDeleteServiceSuccess =(data)=>{
    return{
     type:serviceConstant.DELETE_SERVICE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteServiceFailed =(data)=>{
    return{
     type:serviceConstant.DELETE_SERVICE_FAIL,
     payload:{
         data
     }
    }
 }
// export const actionGetServiceSuccess = (data) => {
//     return {
//         type: serviceConstants.GET_SERVICE_SUCCESS,
//         payload: { data }
//     }
// }

// export const actionGetServiceFail = (e) => {
//     return {
//         type: serviceConstants.GET_SERVICE_FAIL,
//         payload: { e }
//     }
// }