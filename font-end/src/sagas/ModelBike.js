import { call, put } from 'redux-saga/effects';
import {getModelbikePage,deleteModelbike,getItemModelbike,updateModelbike,addModelbike} from '../apis/modelBike'
import {actFetchData, actFetchDataSuccess,actFetchDataFailed,actUpdateModelbikeSuccess,actUpdateModelbikeFailed,actGetModelbikeSuccess} from '../actions/modelbike'
import { STATUS_CODE } from '../constants/api';
import { message } from "antd"
import History from "../history"
export function* fetchModelbikeSaga({ payload }) {
     
    try {     
        const res = yield call(getModelbikePage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actFetchDataSuccess(res.data));
      
    } catch (error) {
        yield put(actFetchDataFailed("Không load được dữ liệu"));
    }
}
export function* deleteModelbikeSaga({ payload }) {
    try {
        const res = yield call(deleteModelbike, payload.data);
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
export function* getItemModelbikeByIdSaga({ payload }) {
   
    try {
        const res = yield call(getItemModelbike, payload.id);   
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actGetModelbikeSuccess(res.data));
        }
    } catch (error) {
        message.error("Mẫu xe không tồn tại hoặc đã bị xóa");
    }
}
export function* updateModelbikeSaga({ payload }) {
    try {
        const res = yield call(updateModelbike, payload.data,payload.id);
        if (res.status == STATUS_CODE.SUCCESS) {
            message.success('Cập nhật mẫu xe thành công')
            yield put(actUpdateModelbikeSuccess(res.data));
        }
    } catch (error) {
        const res = yield call(getItemModelbikeByIdSaga, payload.id);
        yield put(actUpdateModelbikeFailed(res.data));
        message.error('Cập nhật mẫu xe thất bại!  Mã bị trùng ')
    }
}
export function* insertModelbikeSaga({ payload }) {
    try {
        const res = yield call(addModelbike, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm mẫu xe thành công")
            History.push(`/admin/modelbike/update/${res.data.id}`)
        }
    } catch (error) {
        message.error("thêm mẫu xe thất bại")
    }
}

