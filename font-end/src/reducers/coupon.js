import * as couponConstant from "../constants/coupon"
import {message} from 'antd';

var initialState = {
    coupons: [],
    totalPage : 0,
    currentPage: 1,
    couponItem:{},
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
            case couponConstant.FETCH_COUPON_SUCCESS:
                state.coupons = action.payload.data.coupons;
                state.totalElement = action.payload.data.totalElement;
                state.totalPage = action.payload.data.totalPage;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case couponConstant.CREATE_COUPON_SUCCESS:
              
                return {...state}
            case couponConstant.CREATE_COUPON_FAILED:
               
                return {...state}    
            case couponConstant.GET_COUPON_ITEM_SUCCESS:
            
                state.couponItem = action.payload.data;
                return {...state}
            case couponConstant.GET_COUPON_ITEM_FAILED:
                return { ...state }
            case couponConstant.DELETE_COUPON_SUCCESS :
            case couponConstant.DELETE_COUPON_FAILED :
                return { ...state }
            case couponConstant.UPDATE_COUPON_SUCCESS :
                state.couponItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case couponConstant.UPDATE_COUPON_FAILED:
                state.couponItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}        

            default:
                    return { ...state }
        } 

}
export default reducer;


 