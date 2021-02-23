import * as serviceConstant from "../constants/service"
import {message} from 'antd';

var initialState = {
    services: [],
    totalPage : 0,
    currentPage: 1,
    serviceItem:{},
    totalElement: 0,
    maintenanceCard:[],
    ui:{
        isShowModal: false,
        clearForm:true
    }
    // totalElementMaintenanceCard:0,
    // currentPageMaintenanceCard:1,
    // totalPageMaintenanceCard:0

}

const reducer = (state = initialState, action) => {
        switch(action.type){
            case serviceConstant.FETCH_ALL_SERVICE_SUCCESS:
                state.services = action.payload.data.services;
                state.totalElement = action.payload.data.totalElement;
                state.totalPage = action.payload.data.totalPage;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case serviceConstant.CREATE_SERVICE_SUCCESS:
              
                return {...state}
            case serviceConstant.CREATE_SERVICE_FAIL:
               
                return {...state}    
            case serviceConstant.GET_SERVICE_SUCCESS:
            
                state.serviceItem = action.payload.data;
                return {...state}
            case serviceConstant.GET_SERVICE_FAIL:
                return { ...state }
            case serviceConstant.DELETE_SERVICE_SUCCESS :
            case serviceConstant.DELETE_SERVICE_FAIL :
                return { ...state }
            case serviceConstant.UPDATE_SERVICE_SUCCESS :
                state.serviceItem = action.payload.data;
         
                return {...state}
            case serviceConstant.UPDATE_SERVICE_FAIL:
                state.serviceItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}        

            default:
                    return { ...state }
        } 

}
export default reducer;


 