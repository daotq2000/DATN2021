import { call, delay, put } from 'redux-saga/effects';
import { addCoupon, deleteCoupon, getCoupon, getItemCoupon, updateCoupon, getCouponPage, } from './../apis/coupon'
import { actFetchDataCoupon, actFetchDataCouponSuccess, actFetchDataCouponFailed, actDeleteCouponSuccess, actGetItemCouponSuccess, actGetItemCouponFailed, actUpdateCouponSuccess, actUpdateCouponFailed, actCreateCouponSuccess, actCreateCouponFailed, } from './../actions/coupon'
import { STATUS_CODE } from './../constants/api';
import { message } from "antd"
import History from "../history"

export function* fetchCouponSaga({ payload }) {
    try {
      
        const res = yield call(getCouponPage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actFetchDataCouponSuccess(res.data));
        } else {
            yield put(actFetchDataCouponFailed("Không load được dữ liệu"));
        }
    } catch (error) {

    }
}
export function* deleteCouponSaga({ payload }) {
    try {
        const res = yield call(deleteCoupon, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchDataCoupon(1, 5, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataCouponFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getCouponItemByIdSaga({ payload }) {
    try {
        const res = yield call(getItemCoupon, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            console.log('success');
            yield put(actGetItemCouponSuccess(res.data));
        }
    } catch (error) {
        message.error("Phiếu không tồn tại hoặc đã bị xóa");
    }
}
export function* updateCouponSaga({ payload }) {
    console.log(payload);
    try {
        const res = yield call(updateCoupon, payload.data, payload.id);
       
            message.success('Cập nhật cửa hàng thành công')
            yield put(actUpdateCouponSuccess(res.data));
       
    } catch (error) {
        
      
        message.error('Cập nhật phiếu thất bại!  Mã bị trùng ')
    }
}
export function* insertCouponSaga({ payload }) {

    try {
        const res = yield call(addCoupon, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm cửa hàng thành công")
            History.push(`/admin/coupons/${res.data.id}`)
        }
    } catch (error) {
        message.error('Lỗi')
    }

}

