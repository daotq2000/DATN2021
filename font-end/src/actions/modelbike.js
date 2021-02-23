import * as  Constraint  from "../constants/modelBike";
export const actFetchData =(pageNum,pageSize,sortBy,descending,param)=>{
return {
    type: Constraint.FETCH_MODELBIKE,
    payload:{
        pageNum,pageSize,sortBy,descending,param
    }
}
}
export const actFetchDataFailed =(data)=>{
   return{
    type:Constraint.FETCH_MODELBIKE_FAILED,
    payload:{
        data
    }
   }
}
export const actFetchDataSuccess =(data)=>{
    return{
     type:Constraint.FETCH_MODELBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
export const actCreateModelbike =(data)=>{
    return{
     type:Constraint.CREATE_MODELBIKE,
     payload:{
         data
     }
    }
 }
 export const actCreateModelbikeFailed =(data)=>{
    return{
     type:Constraint.CREATE_MODELBIKE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actCreateModelbikeSuccess =(data)=>{
    return{
     type:Constraint.CREATE_MODELBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateModelbike =(data,id)=>{
    return{
     type:Constraint.UPDATE_MODELBIKE,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateModelbikeSuccess =(data)=>{
    return{
     type:Constraint.UPDATE_MODELBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateModelbikeFailed =(data)=>{
    return{
     type:Constraint.UPDATE_MODELBIKE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteModelbike =(data)=>{
    return{
     type:Constraint.DELETE_MODELBIKE,
     payload:{
         data
     }
    }
 }
 export const actDeleteModelbikeSuccess =(data)=>{
    return{
     type:Constraint.DELETE_MODELBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteModelbikeFailed =(data)=>{
    return{
     type:Constraint.DELETE_MODELBIKE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actGetModelbike=(id) =>{
     return{
         type:Constraint.GET_MODELBIKE_ITEM,
         payload:{
             id
         }
     }
 }
 export const actGetModelbikeSuccess = (data) =>{
    return{
        type:Constraint.GET_MODELBIKE_ITEM_SUCCESS,
        payload:{
            data
        }
    }
 }
 export const actGetModelbikeFailed = (data) =>{
    return{
        type:Constraint.GET_MODELBIKE_ITEM_FAILED,
        payload:{
            data
        }
    }
 }
