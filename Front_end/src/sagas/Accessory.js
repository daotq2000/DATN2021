import { call, put } from "redux-saga/effects";
import { actionGetAccessoryFail, actionGetAccessorySuccess } from "../actions/accessory";
import { actionCreateAccessoryFail, actionCreateAccessorySuccess } from "../actions/createAccessory";
import { actionUpdateAccessoryFail, actionUpdateAccessorySuccess } from "../actions/updateAccessory";
import { actionDeleteAccessoryFail, actionDeleteAccessorySuccess } from "../actions/deleteAccessory";
import { createAccessory, deleteAccessory, getAccessory, updateAccessory } from "../apis/accessory";
import { STATUS_CODE } from "../constants/api";

export function* getAccessorySaga({ payload }) {
    try {
        const res = yield call(getAccessory, payload.id);
        yield put(actionGetAccessorySuccess(res.data));
    }
    catch (e) {
        yield put(actionGetAccessoryFail(e));
    }
}

export function* createAccessorySaga({ payload }) {
    try {
        const res = yield call(createAccessory, payload.data);
        if (res.status === STATUS_CODE.CREATED) {
            yield put(actionCreateAccessorySuccess(res.data));
        }
        else {
            yield put(actionCreateAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionCreateAccessoryFail(e));
    }
}

export function* updateAccessorySaga({ payload }) {
    try {
        const res = yield call(updateAccessory, payload.id, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actionUpdateAccessorySuccess(res.data));
        }
        else {
            yield put(actionUpdateAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionUpdateAccessoryFail(e));
    }
}

export function* deleteAccessorySaga({ payload }) {
    try {
        const res = yield call(deleteAccessory, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actionDeleteAccessorySuccess(res.data));
        }
        else {
            yield put(actionDeleteAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionDeleteAccessoryFail(e));
    }
}