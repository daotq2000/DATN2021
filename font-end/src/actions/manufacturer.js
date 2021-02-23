import * as  Constraint  from "../constants/manufacturer";
export const actFetchData =(pageNum,pageSize,sortBy,descending,param)=>{
return {
    type: Constraint.FETCH_MANUFACTURER,
    payload:{
        pageNum,pageSize,sortBy,descending,param
    }
}
}
export const actFetchDataFailed =(data)=>{
   return{
    type:Constraint.FETCH_MANUFACTURER_FAILED,
    payload:{
        data
    }
   }
}
export const actFetchDataSuccess =(data)=>{
    return{
     type:Constraint.FETCH_MANUFACTURER_SUCCESS,
     payload:{
         data
     }
    }
 }
export const actCreateManufacturer =(data)=>{
    return{
     type:Constraint.CREATE_MANUFACTURER,
     payload:{
         data
     }
    }
 }
 export const actCreateManufacturerFailed =(data)=>{
    return{
     type:Constraint.CREATE_MANUFACTURER_FAILED,
     payload:{
         data
     }
    }
 }
 export const actCreateManufacturerSuccess =(data)=>{
    return{
     type:Constraint.CREATE_MANUFACTURER_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateManufacturer =(data,id)=>{
    return{
     type:Constraint.UPDATE_MANUFACTURER,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateManufacturerSuccess =(data)=>{
    return{
     type:Constraint.UPDATE_MANUFACTURER_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateManufacturerFailed =(data)=>{
    return{
     type:Constraint.UPDATE_MANUFACTURER_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteManufacturer =(data)=>{
     console.log(data);
    return{
     type:Constraint.DELETE_MANUFACTURER,
     payload:{
         data
     }
    }
 }
 export const actDeleteManufacturerSuccess =(data)=>{
    return{
     type:Constraint.DELETE_MANUFACTURER_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteManufacturerFailed =(data)=>{
    return{
     type:Constraint.DELETE_MANUFACTURER_FAILED,
     payload:{
         data
     }
    }
 }
 export const actGetManufacturer=(id) =>{
     return{
         type:Constraint.GET_MANUFACTURER_ITEM,
         payload:{
             id
         }
     }
 }
 export const actGetManufacturerSuccess = (data) =>{
    return{
        type:Constraint.GET_MANUFACTURER_ITEM_SUCCESS,
        payload:{
            data
        }
    }
 }
 export const actGetManufacturerFailed = (data) =>{
    return{
        type:Constraint.GET_MANUFACTURER_ITEM_FAILED,
        payload:{
            data
        }
    }
 }
