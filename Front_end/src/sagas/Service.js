import { call, put } from "redux-saga/effects";
import { actionCreateServiceFail, actionCreateServiceSuccess } from "../actions/createService";
import { actionGetServiceFail, actionGetServiceSuccess } from "../actions/service";
import { actionUpdateServiceFail, actionUpdateServiceSuccess } from "../actions/updateService";
import { createService, getService, updateService } from "../apis/service";
import { STATUS_CODE } from "../constants/api";

export function* getServiceSaga({ payload }) {
    try {
        const res = yield call(getService, payload.id);
        yield put(actionGetServiceSuccess(res.data));
    }
    catch(e) {
        yield put(actionGetServiceFail(e));
    }
}

export function* createServiceSaga({ payload }) {
    try {
        const res = yield call(createService, payload.data);
        if (res.status === STATUS_CODE.CREATED) {
            yield put(actionCreateServiceSuccess(res.data));
        }
        else {
            yield put(actionCreateServiceFail(res.data));
        }
    }
    catch (e) {
        yield put(actionCreateServiceFail(e));
    }
}

export function* updateServiceSaga({ payload }) {
    try {
        const res = yield call(updateService, payload.id, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actionUpdateServiceSuccess(res.data));
        }
        else {
            yield put(actionUpdateServiceFail(res.data));
        }
    }
    catch (e) {
        yield put(actionUpdateServiceFail(e));
    }
}