import * as  Constraint  from "../constants/category";
export const actFetchData =(pageNum,pageSize,sortBy,descending,param)=>{
return {
    type: Constraint.FETCH_CATEGORY,
    payload:{
        pageNum,pageSize,sortBy,descending,param
    }
}
}
export const actFetchDataFailed =(data)=>{
   return{
    type:Constraint.FETCH_CATEGORY_FAILED,
    payload:{
        data
    }
   }
}
export const actFetchDataSuccess =(data)=>{
    return{
     type:Constraint.FETCH_CATEGORY_SUCCESS,
     payload:{
         data
     }
    }
 }
export const actCreateCategory =(data)=>{
    return{
     type:Constraint.CREATE_CATEGORY,
     payload:{
         data
     }
    }
 }
 export const actCreateCategoryFailed =(data)=>{
    return{
     type:Constraint.CREATE_CATEGORY_FAILED,
     payload:{
         data
     }
    }
 }
 export const actCreateCategorySuccess =(data)=>{
    return{
     type:Constraint.CREATE_CATEGORY_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateCategory =(data,id)=>{
    return{
     type:Constraint.UPDATE_CATEGORY,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateCategorySuccess =(data)=>{
    return{
     type:Constraint.UPDATE_CATEGORY_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateCategoryFailed =(data)=>{
    return{
     type:Constraint.UPDATE_CATEGORY_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteCategory=(data)=>{
     console.log(data);
    return{
     type:Constraint.DELETE_CATEGORY,
     payload:{
         data
     }
    }
 }
 export const actDeleteCategorySuccess =(data)=>{
    return{
     type:Constraint.DELETE_CATEGORY_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteCategoryFailed =(data)=>{
    return{
     type:Constraint.DELETE_CATEGORY_FAILED,
     payload:{
         data
     }
    }
 }
 export const actGetCategory=(id) =>{
     return{
         type:Constraint.GET_CATEGORY_ITEM,
         payload:{
             id
         }
     }
 }
 export const actGetCategorySuccess = (data) =>{
    return{
        type:Constraint.GET_CATEGORY_ITEM_SUCCESS,
        payload:{
            data
        }
    }
 }
 export const actGetCategoryFailed = (data) =>{
    return{
        type:Constraint.GET_CATEGORY_ITEM_FAILED,
        payload:{
            data
        }
    }
 }
