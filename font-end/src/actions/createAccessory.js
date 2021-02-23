import * as accessoryConstants from '../constants/accessory';
import * as MaintenanceCardAddType from "../constants/MaintenanceCardAdd";
export const actGetManufacture = (pageNum,pageSize,sortBy,descending,param)=>{
    return{
        type: accessoryConstants.FETCH_MANUFACTURE ,
        payload:{pageNum,pageSize,sortBy,descending,param}
    }
}
export const actGetManufactureSuccess = (data)=>{
    return{
        type: accessoryConstants.FETCH_MANUFACTURE_SUCCESS ,
        payload:{data}
    }
}
export const actGetCategories = (pageNum,pageSize,sortBy,descending,param)=>{
    return{
        type: accessoryConstants.FETCH_CATEGORIES ,
        payload:{pageNum,pageSize,sortBy,descending,param}
    }
}
export const actGetCategoriesSuccess = (data)=>{
    return{
        type: accessoryConstants.FETCH_CATEGORIES_SUCCESS ,
        payload:{data}
    }
}
export const actionCreateAccessory = (data) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY,
        payload: {
            data
        }
    }
}

export const actionCreateAccessorySuccess = (data) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionCreateAccessoryFail = (e) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY_FAIL,
        payload: {
            e
        }
    }
}