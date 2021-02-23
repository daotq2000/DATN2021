import * as storeConstant from '../constants/store';
export const actFetchDataStore = (pageNum,pageSize,sortBy,descending,param) =>{
    return{
        type: storeConstant.FETCH_STORE ,
        payload:{pageNum,pageSize,sortBy,descending,param}
    }
}
export const actFetchDataStoreSuccess = (data) =>{
    return{
        type:storeConstant.FETCH_STORE_SUCCESS,
        payload:{data}
    }
}
export const actFetchDataStoreFailed = (data) =>{
    return{
        type:storeConstant.FETCH_STORE_FAILED,
        payload:{data}
    }
}
export const actGetItemStore = (id) => {
    return {
        type: storeConstant.GET_STORE_ITEM,
        payload: { id }
    }
}
export const actGetItemStoreSuccess = (data) =>{
    return{
        type:storeConstant.GET_STORE_ITEM_SUCCESS,
        payload:{
            data
        }
    }
}
export const actGetItemStoreFailed = (data) =>{
    return{
        type:storeConstant.GET_STORE_ITEM_FAILED,
        payload:{
            data
        }
    }
}
export const actCreateStore =(data)=>{
    return{
     type:storeConstant.CREATE_STORE,
     payload:{
         data
     }
    }
 }
 export const actCreateStoreSuccess =(data)=>{
    return{
     type:storeConstant.CREATE_STORE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actCreateStoreFailed =(data)=>{
    return{
     type:storeConstant.CREATE_STORE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actUpdateStore =(id,data)=>{
    return{
     type:storeConstant.UPDATE_STORE,
     payload:{
         id,
         data
     }
    }
 }
 export const actUpdateStoreSuccess =(data)=>{
    return{
     type:storeConstant.UPDATE_STORE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateStoreFailed =(data)=>{
    return{
     type:storeConstant.UPDATE_STORE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteStore =(data)=>{
    return{
     type:storeConstant.DELETE_STORE,
     payload:{
         data
     }
    }
 }
 export const actDeleteStoreSuccess =(data)=>{
    return{
     type:storeConstant.DELETE_STORE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteStoreFailed =(data)=>{
    return{
     type:storeConstant.DELETE_STORE_FAILED,
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