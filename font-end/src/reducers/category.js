import * as Constraints from "../constants/category"
import {message} from 'antd';

var initialState = {
    category: [],
    totalPage : 0,
    currentPage: 1,
    categoryItem:{},
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
            
            case Constraints.FETCH_CATEGORY_SUCCESS:   
                state.category = action.payload.data.category;
                state.totalElement = action.payload.data.totalElements;
                state.totalPage = action.payload.data.totalPages;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case Constraints.CREATE_CATEGORY_SUCCESS:              
                return {...state}
            case Constraints.CREATE_CATEGORY_FAILED:              
                return {...state}    
            case Constraints.GET_CATEGORY_ITEM_SUCCESS:                                 
                state. categoryItem = action.payload.data;           
                return {...state}
            case Constraints.GET_CATEGORY_ITEM_FAILED:
                return { ...state }
            case Constraints.DELETE_CATEGORY_SUCCESS :
            case Constraints.DELETE_CATEGORY_FAILED :
                return { ...state }
            case Constraints.UPDATE_CATEGORY_SUCCESS :
                state. categoryItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case Constraints.UPDATE_CATEGORY_FAILED:
                state. categoryItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}
            default:
                    return { ...state }
        } 

}
export default reducer; 