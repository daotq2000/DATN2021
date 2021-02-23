import { call, put } from 'redux-saga/effects';
import {getManufacturerPage,deleteManufacturer,getItemManufacturer,updateManufacturer,addManufacturer} from '../apis/manufacturer'
import {actFetchData, actFetchDataSuccess,actFetchDataFailed,actUpdateManufacturerSuccess,actUpdateManufacturerFailed,actGetManufacturerSuccess} from '../actions/manufacturer'
import { STATUS_CODE } from '../constants/api';
import { message } from "antd"
import History from "../history"
export function* fetchManufacturerSaga({ payload }) {
     
    try {     
        const res = yield call(getManufacturerPage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actFetchDataSuccess(res.data));
      
    } catch (error) {
        message.error(error);
    }
}
export function* deleteManufacturerSaga({ payload }) {
    try {
        const res = yield call(deleteManufacturer, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchData(1, 5, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getItemManufacturerByIdSaga({ payload }) {
   
    try {
        const res = yield call(getItemManufacturer, payload.id);     
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actGetManufacturerSuccess(res.data));
        }
    } catch (error) {
        message.error("Nhà sản xuất không tồn tại hoặc đã bị xóa");
    }
}
export function* updateManufacturerSaga({ payload }) {
    try {
        const res = yield call(updateManufacturer, payload.data,payload.id);
        if (res.status == STATUS_CODE.SUCCESS) {
            message.success('Cập nhật Nhà sản xuất')
            yield put(actUpdateManufacturerSuccess(res.data));
        }
    } catch (error) {
        const res = yield call(getItemManufacturerByIdSaga, payload.id);
        message.error('Cập nhật Nhà sản xuất thất bại!  Mã bị trùng ')
    }
}
export function* insertManufacturerSaga({ payload }) {
    try {
        const res = yield call(addManufacturer, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm nhà sản xuất thành công")
            History.push(`/admin/manufacturer/update/${res.data.id}`)
        }
    } catch (error) {
        message.error("thêm nhà sản xuất thất bại")
    }
}

