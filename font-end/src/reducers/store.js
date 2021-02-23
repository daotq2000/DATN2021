import * as storeConstant from "../constants/store"
import {message} from 'antd';

var initialState = {
    stores: [],
    totalPage : 0,
    currentPage: 1,
    storeItem:{},
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
            case storeConstant.FETCH_STORE_SUCCESS:
                state.stores = action.payload.data.stores;
                state.totalElement = action.payload.data.totalElement;
                state.totalPage = action.payload.data.totalPage;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case storeConstant.CREATE_STORE_SUCCESS:
              
                return {...state}
            case storeConstant.CREATE_STORE_FAILED:
               
                return {...state}    
            case storeConstant.GET_STORE_ITEM_SUCCESS:
            
                state.storeItem = action.payload.data;
                return {...state}
            case storeConstant.GET_STORE_ITEM_FAILED:
                return { ...state }
            case storeConstant.DELETE_STORE_SUCCESS :
            case storeConstant.DELETE_STORE_FAILED :
                return { ...state }
            case storeConstant.UPDATE_STORE_SUCCESS :
                state.storeItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case storeConstant.UPDATE_STORE_FAILED:
                state.storeItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}        

            default:
                    return { ...state }
        } 

}
export default reducer;


 