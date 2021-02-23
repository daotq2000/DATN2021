import * as  Contraint  from "../constants/colorBike";
export const actFetchData =(pageNum,pageSize,sortBy,descending,param)=>{
return {
    type: Contraint.FETCH_COLORBIKE,
    payload:{
        pageNum,pageSize,sortBy,descending,param
    }
}
}
export const actFetchDataFailed =(data)=>{
   return{
    type:Contraint.FETCH_COLORBIKE_FAILED,
    payload:{
        data
    }
   }
}
export const actFetchDataSuccess =(data)=>{
    return{
     type:Contraint.FETCH_COLORBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
export const actCreateColorBike =(data)=>{
    return{
     type:Contraint.CREATE_COLORBIKE,
     payload:{
         data
     }
    }
 }
 export const actCreateColorBikeFailed =(data)=>{
    return{
     type:Contraint.CREATE_COLORBIKE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actCreateColorBikeSuccess =(data)=>{
    return{
     type:Contraint.CREATE_COLORBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateColorBike =(data,id)=>{
    return{
     type:Contraint.UPDATE_COLORBIKE,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateColorBikeSuccess =(data,id)=>{
    return{
     type:Contraint.UPDATE_COLORBIKE_SUCCESS,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateColorBikeFailed =(data,id)=>{
    return{
     type:Contraint.UPDATE_COLORBIKE_FAILED,
     payload:{
         data,id
     }
    }
 }
 export const actDeleteColorBike =(data)=>{
     console.log(data);
    return{
     type:Contraint.DELETE_COLORBIKE,
     payload:{
         data
     }
    }
 }
 export const actDeleteColorBikeSuccess =(data)=>{
    return{
     type:Contraint.DELETE_COLORBIKE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteColorBikeFailed =(data)=>{
    return{
     type:Contraint.DELETE_COLORBIKE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actGetColorBike =(id) =>{
     return{
         type:Contraint.GET_COLORBIKE_ITEM,
         payload:{
             id
         }
     }
 }
 export const actGetColorBikeSuccess = (data) =>{
    return{
        type:Contraint.GET_COLORBIKE_ITEM_SUCCESS,
        payload:{
            data
        }
    }
 }
 export const actGetColorBikeFailed = (data) =>{
    return{
        type:Contraint.GET_COLORBIKE_ITEM_FAILED,
        payload:{
            data
        }
    }
 }
