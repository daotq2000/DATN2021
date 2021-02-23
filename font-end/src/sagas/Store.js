import { call, delay, put } from 'redux-saga/effects';
import { addStore, deleteStore, getStore, getItemStore, updateStore, getStorePage, } from './../apis/store'
import { actFetchDataStore, actFetchDataStoreSuccess, actFetchDataStoreFailed, actDeleteStoreSuccess, actGetItemStoreSuccess, actGetItemStoreFailed, actUpdateStoreSuccess, actUpdateStoreFailed, actCreateStoreSuccess, actCreateStoreFailed, } from './../actions/store'
import { STATUS_CODE } from './../constants/api';
import { message } from "antd"
import History from "../history"

export function* fetchStoreSaga({ payload }) {
    try {
      
        const res = yield call(getStorePage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actFetchDataStoreSuccess(res.data));
        } else {
            yield put(actFetchDataStoreFailed("Không load được dữ liệu"));
        }
    } catch (error) {

    }
}
export function* deleteStoreSaga({ payload }) {
    try {
        const res = yield call(deleteStore, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchDataStore(1, 5, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataStoreFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getStoreItemByIdSaga({ payload }) {
    try {
        const res = yield call(getItemStore, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            console.log('success');
            yield put(actGetItemStoreSuccess(res.data));
        }
    } catch (error) {
        message.error("Cửa hàng không tồn tại hoặc đã bị xóa");
    }
}
export function* updateStoreSaga({ payload }) {
    try {
        const res = yield call(updateStore, payload.data, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Cập nhật cửa hàng thành công')
            yield put(actUpdateStoreSuccess(res.data));
        }
    } catch (error) {
        const res = yield call(getItemStore, payload.id);
        yield put(actUpdateStoreFailed(res.data));
        message.error('Cập nhật cửa hàng thất bại!  Mã bị trùng ')
    }
}
export function* insertStoreSaga({ payload }) {

    try {
        const res = yield call(addStore, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm cửa hàng thành công")
            History.push(`/admin/stores/${res.data.id}`)
        }
    } catch (error) {
        message.error('Lỗi')
    }

}

