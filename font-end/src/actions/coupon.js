import * as couponConstant from '../constants/coupon';
export const actFetchDataCoupon = (pageNum,pageSize,sortBy,descending,param) =>{
    return{
        type: couponConstant.FETCH_COUPON ,
        payload:{pageNum,pageSize,sortBy,descending,param}
    }
}
export const actFetchDataCouponSuccess = (data) =>{
    return{
        type:couponConstant.FETCH_COUPON_SUCCESS,
        payload:{data}
    }
}
export const actFetchDataCouponFailed = (data) =>{
    return{
        type:couponConstant.FETCH_COUPON_FAILED,
        payload:{data}
    }
}
export const actGetItemCoupon = (id) => {
    return {
        type: couponConstant.GET_COUPON_ITEM,
        payload: { id }
    }
}
export const actGetItemCouponSuccess = (data) =>{
    return{
        type:couponConstant.GET_COUPON_ITEM_SUCCESS,
        payload:{
            data
        }
    }
}
export const actGetItemCouponFailed = (data) =>{
    return{
        type:couponConstant.GET_COUPON_ITEM_FAILED,
        payload:{
            data
        }
    }
}
export const actCreateCoupon =(data)=>{
    return{
     type:couponConstant.CREATE_COUPON,
     payload:{
         data
     }
    }
 }
 export const actCreateCouponSuccess =(data)=>{
    return{
     type:couponConstant.CREATE_COUPON_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actCreateCouponFailed =(data)=>{
    return{
     type:couponConstant.CREATE_COUPON_FAILED,
     payload:{
         data
     }
    }
 }
 export const actUpdateCoupon =(id,data)=>{
    return{
     type:couponConstant.UPDATE_COUPON,
     payload:{
         id,
         data
     }
    }
 }
 export const actUpdateCouponSuccess =(data)=>{
    return{
     type:couponConstant.UPDATE_COUPON_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateCouponFailed =(data)=>{
    return{
     type:couponConstant.UPDATE_COUPON_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteCoupon =(data)=>{
    return{
     type:couponConstant.DELETE_COUPON,
     payload:{
         data
     }
    }
 }
 export const actDeleteCouponSuccess =(data)=>{
    return{
     type:couponConstant.DELETE_COUPON_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteCouponFailed =(data)=>{
    return{
     type:couponConstant.DELETE_COUPON_FAILED,
     payload:{
         data
     }
    }
 }
