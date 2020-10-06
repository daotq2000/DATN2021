import * as Contraint from '../constants/users'
export const actlogin = (data) =>{
    return{
        type:Contraint.LOGIN,
        payload:{
            data
        }
      
    }
 }
 export const actloginSuccess = (data) =>{
    return{
        type:Contraint.LOGIN_SUCCESS,
        payload:{
            data
        }
      
    }
 }
 export const actloginFailed = (data) =>{
    return{
        type:Contraint.LOGIN_FAILED,
        payload:{
            data
        }
    }
 }