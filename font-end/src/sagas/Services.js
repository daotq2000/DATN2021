import { call, delay, put } from 'redux-saga/effects';
import { createService, deleteService, getItemService, updateService, getListService, } from './../apis/service'
import { actFetchDataService, actFetchDataServiceSuccess, actFetchDataServiceFailed, actDeleteServiceSuccess, actGetItemServiceSuccess, actGetItemServiceFailed, actUpdateServiceSuccess, actUpdateServiceFailed, actCreateService, actCreateServiceSuccess, actCreateServiceFailed, } from './../actions/service'
import { STATUS_CODE } from './../constants/api';
import { message } from "antd"
import History from "../history"

export function* fetchServiceSaga({ payload }) {
    try {
      
        const res = yield call(getListService, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        console.log(res);
        yield put(actFetchDataServiceSuccess(res.data));
       
    } catch (error) {
        console.log(error);
        yield put(actFetchDataServiceFailed("Không load được dữ liệu"));
    }
}
export function* deleteServiceSaga({ payload }) {
    try {
        const res = yield call(deleteService, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchDataService(1, 5, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataServiceFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getServiceItemByIdSaga({ payload }) {
    try {
        const res = yield call(getItemService, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            console.log('success');
            yield put(actGetItemServiceSuccess(res.data));
        }
    } catch (error) {
        message.error("Dịch vụ không tồn tại hoặc đã bị xóa");
    }
}
export function* updateServiceSaga({ payload }) {
   
    try {
        const res = yield call(updateService,payload.idService, payload.data);
        console.log(res.status);
        
            message.success('Cập nhật dịch vụ thành công')
            yield put(actUpdateServiceSuccess(res.data));
      
    } catch (error) {
        
        // yield put(actUpdateServiceFailed(error.reponse));
        message.error('Cập nhật dịch vụ thất bại!  Mã bị trùng ')
    }
}
export function* insertServiceSaga({ payload }) {
debugger
    try {
        const res = yield call(createService, payload.data);

            message.success("Thêm dịch vụ thành công")
            History.push(`/admin/v2/services/${res.data.id}`)

    } catch (error) {
        message.error('Lỗi')
    }

}
