import { message } from "antd";
import { call, put } from "redux-saga/effects";
import { actionDeleteProductsFail } from "../actions/deleteProducts";
import { actionGetProductsSuccess} from "../actions/products";
import  {actGetCategories,actGetCategoriesSuccess,actGetManufacture,actGetManufactureSuccess } from '../actions/createAccessory'
import { deleteProducts, getProducts,getManufactureList,getCategories } from "../apis/products";
import { STATUS_CODE } from "../constants/api";

export function* getProductsSaga({ payload }) {
    try {
        const res = yield call(getProducts, payload.key, payload.page, payload.size);
        yield put(actionGetProductsSuccess(res.data));
    }
    catch (e) {

    }
}
export function* getManufactureProductSaga({ payload }) {
    try {
        const res = yield call(getManufactureList, payload.page, payload.size, payload.sortBy, payload.descending,payload.params);
        yield put(actGetManufactureSuccess(res.data));
    }
    catch (e) {

    }
}
export function* getCategoriesProductSaga({ payload }) {
    try {
        const res = yield call(getCategories);
        console.log(res)
        yield put(actGetCategoriesSuccess(res.data));
    }
    catch (e) {

    }
}
export function* deleteProductsSaga({ payload }) {
    try {
        const res = yield call(deleteProducts, payload.idArray);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Đã xóa dịch vụ");
            yield put(actionGetProductsSuccess(res.data));
        }
        else {
            yield put(actionDeleteProductsFail(res.data));
        }
    }
    catch(e) {
        yield put(actionDeleteProductsFail(e));
    }
}