import { call, delay, put } from 'redux-saga/effects';
import { STATUS_CODE } from './../constants/api';
import { message } from "antd"
import {login} from "../apis/users"
import  {actloginFailed,actloginSuccess,actlogin} from "../actions/users"
export function* loginSaga({payload}){
    try {
        const res = yield call(login,payload.data);
        console.log(res);
        if(res.status === STATUS_CODE.SUCCESS){
            message.success("Đăng nhập thành công")
            yield put(actloginSuccess(res.headers.authorization));
        }

    } catch (error) {
       message.error("Đăng nhập thất bại")
       yield put(actloginFailed("Đăng nhập thất bại"));
    }
}