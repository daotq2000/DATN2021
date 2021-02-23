import * as Constraints from "../constants/modelBike"
import {message} from 'antd';

var initialState = {
    modelBikes: [],
    totalPage : 0,
    currentPage: 1,
    modelBikeItem:{},
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
            
            case Constraints.FETCH_MODELBIKE_SUCCESS:
                state.modelBikes = action.payload.data.modelBikes;
                state.totalElement = action.payload.data.totalElements;
                state.totalPage = action.payload.data.totalPages;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case Constraints.CREATE_MODELBIKE_SUCCESS:              
                return {...state}
            case Constraints.CREATE_MODELBIKE_FAILED:              
                return {...state}    
            case Constraints.GET_MODELBIKE_ITEM_SUCCESS:                        
                state.modelBikeItem = action.payload.data;           
                return {...state}
            case Constraints.GET_MODELBIKE_ITEM_FAILED:
                return { ...state }
            case Constraints.DELETE_MODELBIKE_SUCCESS :
            case Constraints.DELETE_MODELBIKE_FAILED :
                return { ...state }
            case Constraints.UPDATE_MODELBIKE_SUCCESS :
                state. modelBikeItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case Constraints.UPDATE_MODELBIKE_FAILED:
                state.modelBikeItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}
            default:
                    return { ...state }
        } 

}
export default reducer; 