import { call, put } from 'redux-saga/effects';
import {getColorBikePage,deleteColorBike,getItemColorBike,addColorBike,updateColorBike} from '../apis/colorBike'
import {actFetchData, actFetchDataSuccess,actDeleteColorBikeSuccess,actFetchDataFailed,actUpdateColorBikeSuccess,actUpdateColorBikeFailed,actGetColorBikeSuccess} from '../actions/colorBike'
import { STATUS_CODE } from '../constants/api';
import { message } from "antd"
import History from "../history"
export function* fetchColorBikeSaga({ payload }) {
    console.log(payload);
    try {     
        const res = yield call(getColorBikePage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
            yield put(actFetchDataSuccess(res.data));
      
    } catch (error) {
        yield put(actFetchDataFailed("Không load được dữ liệu"));
    }
}
export function* deleteColorBikeSaga({ payload }) {
    try {
        const res = yield call(deleteColorBike, payload.data);
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
export function* getItemColorBikeByIdSaga({ payload }) {
    try {
        const res = yield call(getItemColorBike, payload.id);   
      
       
            yield put(actGetColorBikeSuccess(res.data));
        
    } catch (error) {
        message.error("Màu không tồn tại hoặc đã bị xóa");
    }
}
export function* updateColorBikeSaga({ payload }) {
    try {
        const res = yield call(updateColorBike, payload.data, payload.id);
        if (res.status == STATUS_CODE.SUCCESS) {
            message.success('Cập nhật màu thành công')
            History.push(`/admin/colorbike/update/${res.data.id}`)
          
        }
    } catch (error) {
        const res = yield call(getItemColorBikeByIdSaga, payload.id);
        yield put(actUpdateColorBikeFailed(res.data));
        message.error('Cập nhật màu thất bại!  Mã bị trùng ')
    }
}
export function* insertColorBikeSaga({ payload }) {
    try {
        const res = yield call(addColorBike, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm màu thành công")
            History.push(`/admin/colorbike/update/${res.data.id}`)
        }
    } catch (error) {
        message.error("Tên màu")
    }
}

