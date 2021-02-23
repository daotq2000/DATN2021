import * as Constraints from "../constants/manufacturer"
import {message} from 'antd';

var initialState = {
    manufacturers: [],
    totalPage : 0,
    currentPage: 1,
    manufacturerItem:{},
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
            
            case Constraints.FETCH_MANUFACTURER_SUCCESS:   
                state.manufacturers = action.payload.data.manufacturer;
                state.totalElement = action.payload.data.totalElements;
                state.totalPage = action.payload.data.totalPages;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case Constraints.CREATE_MANUFACTURER_SUCCESS:              
                return {...state}
            case Constraints.CREATE_MANUFACTURER_FAILED:              
                return {...state}    
            case Constraints.GET_MANUFACTURER_ITEM_SUCCESS:                                 
                state. manufacturerItem = action.payload.data;           
                return {...state}
            case Constraints.GET_MANUFACTURER_ITEM_FAILED:
                return { ...state }
            case Constraints.DELETE_MANUFACTURER_SUCCESS :
            case Constraints.DELETE_MANUFACTURER_FAILED :
                return { ...state }
            case Constraints.UPDATE_MANUFACTURER_SUCCESS :
                state. manufacturerItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case Constraints.UPDATE_MANUFACTURER_FAILED:
                state. manufacturerItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}
            default:
                    return { ...state }
        } 

}
export default reducer; 