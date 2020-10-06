import { call, delay, put } from 'redux-saga/effects';
import { getListCustomer, createCustomer, getCustomerById, updateCustomer, deleteCustomerById, updateMultipleStatusCustomer, filterPayStatusOfCustomer } from './../apis/customer'
import { actCreateCustomerFailed, actCreateCustomerSuccess, actGetListCustomerSuccess, actGetCustomerByIdSuccess, actGetCustomerByIdFailed, actUpdateCustomerSuccess, actUpdateCustomerFailed, actDeleteCustomerSuccess, actDeleteCustomerFailed, actUpdateMultipleStatusCustomerSuccess, actUpdateMultipleStatusCustomerFailed, actFilterPayStatusOfCustomerSuccess } from './../actions/customer'
import { STATUS_CODE } from './../constants/api';
import history from '../history';
export function* getCustomerByIdSaga({ payload }) {
    try {
        const res = yield call(getCustomerById, payload.idCustomer);
        
        yield put(actGetCustomerByIdSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        yield put(actGetCustomerByIdFailed(e))
    }
}

export function* getCustomerSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(getListCustomer, payload.key, payload.page, payload.size, payload.name, payload.order);
        yield put(actGetListCustomerSuccess(res.data))
    }
    catch (e) {

    }
}

export function* createCustomerSaga({ payload }) {
    let data = {
        name: payload.data.txtName,
        code: payload.data.txtcode,
        address: payload.data.txtaddress,
        description: payload.data.txtdescription,
        email: payload.data.txtemail,
        phoneNumber: payload.data.txtphoneNumber,

    }
    if(payload.data.ward !== null){
        data.ward = {
            code : payload.data.ward[0]
        }
    }
    
    try {
        const res = yield call(createCustomer, data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actCreateCustomerSuccess(res.data))
            yield delay(500)
            yield history.push(`/admin/customers`);
        }
        else {
            yield put(actCreateCustomerFailed(res.data))
        }
    }
    catch (e) {
        yield put(actCreateCustomerFailed(e))
    }
}

export function* updateCustomerSaga({ payload }) {
   
    let data = {
        name: payload.data.txtName,
        code: payload.data.txtcode,
        description: payload.data.txtdescription,
        email: payload.data.txtemail,
        phoneNumber: payload.data.txtphoneNumber,
        address: payload.data.txtaddress,
    }

    if(payload.data.ward !== null){
        if(payload.data.ward.length === 0){

        }else{
            data.ward = {
                code : payload.data.ward[0]
            }
        }
    }

    console.log(payload.data.ward);
    // if(payload.data.ward && payload.data.ward === null){
    //     console.log('sdfdsfsd');
    // }
    try {
        const res = yield call(updateCustomer, payload.idCustomer, data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actUpdateCustomerSuccess(res.data))
            //console.log('dfsdf',res.data.address);
            yield history.push(`/admin/customers`);
        }
        else {
            yield put(actUpdateCustomerFailed(res.data))
        }
    }
    catch (e) {
        yield put(actUpdateCustomerFailed(e))
        console.log(e);
    }
}


export function* deleteCustomerSaga({ payload }) {
    try {
        const res = yield call(deleteCustomerById, payload.idCustomers);
        yield put(actDeleteCustomerSuccess(res.data))
    }
    catch (e) {
        yield put(actDeleteCustomerFailed(e))
    }
}

export function* updateMultipleStatusCustomerSaga({ payload }) {
    try {
        const res = yield call(updateMultipleStatusCustomer, payload.idCustomers);
        yield put(actUpdateMultipleStatusCustomerSuccess(res.data))
    }
    catch (e) {
        yield put(actUpdateMultipleStatusCustomerFailed(e))
    }
}


export function* filterPayStatusOfCustomerSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(filterPayStatusOfCustomer, payload.page, payload.size, payload.pay_status);
        yield put(actFilterPayStatusOfCustomerSuccess(res.data))
    }
    catch (e) {

    }
}
