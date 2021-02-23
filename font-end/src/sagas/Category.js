import { call, put } from 'redux-saga/effects';
import {getCategoryPage,deleteCategory,getItemCategory,updateCategory,addCategory} from '../apis/category'
import {actFetchData, actFetchDataSuccess,actFetchDataFailed,actUpdateCategorySuccess,actGetCategorySuccess} from '../actions/category'
import { STATUS_CODE } from '../constants/api';
import { message } from "antd"
import History from "../history"
export function* fetchCategorySaga({ payload }) {
     
    try {     
        const res = yield call(getCategoryPage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actFetchDataSuccess(res.data));
      
    } catch (error) {

    }
}
export function* deleteCategorySaga({ payload }) {
    try {
        const res = yield call(deleteCategory, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchData(1, 10, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getItemCategoryByIdSaga({ payload }) {
   
    try {
        const res = yield call(getItemCategory, payload.id);     
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actGetCategorySuccess(res.data));
        }
    } catch (error) {
        message.error(" danh mục sản phẩm không tồn tại hoặc đã bị xóa");
    }
}
export function* updateCategorySaga({ payload }) {
    try {
        const res = yield call(updateCategory, payload.data,payload.id);
        if (res.status == STATUS_CODE.SUCCESS) {
            message.success('Cập nhật  danh mục sản phẩm thành công')
            yield put(actUpdateCategorySuccess(res.data));
        }
    } catch (error) {
        const res = yield call(getItemCategoryByIdSaga, payload.id);
        message.error('Cập nhật  danh mục sản phẩm thất bại!  Mã bị trùng ')
    }
}
export function* insertCategorySaga({ payload }) {
    try {
        const res = yield call(addCategory, payload.data);
        if (res.status === STATUS_CODE.CREATED) {
            message.success("Thêm  danh mục sản phẩm thành công")
            History.push(`/admin/Category/update/${res.data.id}`)
        }
    } catch (error) {
        message.error("thêm  danh mục sản phẩm thất bại")
    }
}

