import * as Constraints from "../constants/colorBike"
import {message} from 'antd';

var initialState = {
    colorBikes: [],
    totalPage : 0,
    currentPage: 1,
    colorBikeItem:{},
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
            case Constraints.FETCH_COLORBIKE_SUCCESS:          
                state.colorBikes = action.payload.data.colorBikes;
                state.totalElement = action.payload.data.totalElements;
                state.totalPage = action.payload.data.totalPages;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case Constraints.CREATE_COLORBIKE_SUCCESS:   

                return {...state}
            case Constraints.CREATE_COLORBIKE_FAILED:              
                return {...state}    
            case Constraints.GET_COLORBIKE_ITEM_SUCCESS:                       
                state.colorBikeItem = action.payload.data;           
                return {...state}
            case Constraints.GET_COLORBIKE_ITEM_FAILED:
                return { ...state }
            case Constraints.DELETE_COLORBIKE_SUCCESS :
            case Constraints.DELETE_COLORBIKE_FAILED :
                return { ...state }
            case Constraints.UPDATE_COLORBIKE_SUCCESS :
                state.colorBikeItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case Constraints.UPDATE_COLORBIKE_FAILED:
                state.colorBikeItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}
            default:
                    return { ...state }
        } 

}
export default reducer;


 