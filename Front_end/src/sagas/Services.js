import { call, put } from "redux-saga/effects";
import { actionGetServicesSuccess } from "../actions/services";
import { getListServices } from "../apis/services";

export function* getServicesSaga({payload}) {
    try {
        const res = yield call(getListServices, payload.key, payload.page, payload.size);
        yield put(actionGetServicesSuccess(res.data)); 
    }
    catch(e) {

    }
}