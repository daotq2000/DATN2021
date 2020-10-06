import { call, delay, put, select } from 'redux-saga/effects'
import { searchCustomer, createCustomer, searchRepairman, searchProduct, createMaintenanceCard, fetchMaintenanceCardById, 
    updateMaintenanceCard, completeCard,updateStatusDetail,createPaymentHistory } from '../apis/maintenanceCardAdd'
import {
    actCreateCustomerFailed, actCreateCustomerSuccess, actSearchCustomerSuccess,
    actSearchRepairmanSuccess, actSearchProductSuccess, actError,
    actCreateMaintenanceCardSuccess, actCreateMaintenanceCardFailed, actUpdateListCustomerSuccess, actUpdateListRepairmanSuccess,
    actFetchMaintenanceCardByIdSuccess, actUpdateListProductSuccess, actUpdateMaintenanceCardSuccess, actUpdateMaintenanceCardFailed, actCompleteCardSuccess, actCompleteCardFailed, actUpdateStatusDetailSuccess, actUpdateStatusDetailFailed, actCreatePaymentHistorySuccess
} from '../actions/maintenanceCardAdd'
import { STATUS_CODE } from '../constants/api';
export function* searchCustomerMaintenanceCardSaga({ payload }) {
    yield delay(500)
    try {
        console.log(123);
        const res = yield call(searchCustomer, payload.key, payload.page, payload.size);
        yield put(actSearchCustomerSuccess(res.data))
    }
    catch (e) {

    }
}

export function* updateListCustomerMaintenanceCardSaga({ payload }) {
    yield delay(500)
    try {
        const page = yield select(state => state.maintenanceCardAdd.customerPage)
        const res = yield call(searchCustomer, payload.data, page + 1, 5);
        yield put(actUpdateListCustomerSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* updateListRepairmanMaintenanceCardSaga({ payload }) {

    try {
        const page = yield select(state => state.maintenanceCardAdd.repairmanPage)
        console.log(payload);
        const res = yield call(searchRepairman, payload.data, page + 1, 7);
        yield put(actUpdateListRepairmanSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* createCustomerRepairSaga({ payload }) {
    try {
        const res = yield call(createCustomer, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actCreateCustomerSuccess(res.data))
        }
        else {
            yield put(actCreateCustomerFailed(res.data))
        }
    }
    catch (e) {
        yield put(actCreateCustomerFailed(e))
    }

}

export function* searchRepairmanSaga({ payload }) {
    try {
        const res = yield call(searchRepairman, payload.key, 1, 7);
        yield put(actSearchRepairmanSuccess(res.data))
    }
    catch (e) {

    }
}


export function* searchProductSaga({ payload }) {

    try {
        const res = yield call(searchProduct, payload.key, payload.page, payload.size);
        console.log(res);
        yield put(actSearchProductSuccess(res.data))
    }
    catch (e) {

    }
}

export function* updateListProductSaga({ payload }) {
    yield delay(500)
    try {
        const page = yield select(state => state.maintenanceCardAdd.productPage)
        const res = yield call(searchProduct, payload.data, page + 1, 5);
        console.log(res);
        yield put(actUpdateListProductSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* createMaintenanceCardSaga({ payload }) {
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    const user = yield select(state => state.userReducer);
    let data;
    let error = [];
    if (createMaintenanceCard1.customerItem.id === undefined) {
        error.push('customerError')
    }
    if (error.length === 0 && payload.check) {
        data = {
            platesNumber: payload.data.txtPlatesNumber,
            customer: {
                id: createMaintenanceCard1.customerItem.id
            },
            coordinator: {
                id: user.id
            },
            maintenanceCardDetails: [],
        }
        if (payload.data.txtCode !== undefined) {
            data.code = payload.data.txtCode
        }
        if (payload.data.txtModel !== undefined) {
            data.model = payload.data.txtModel
        }
        if (payload.data.txtColor !== undefined) {
            data.color = payload.data.txtColor
        }
        if (createMaintenanceCard1.repairman.user.id !== undefined) {
            data.repairman = {
                id: createMaintenanceCard1.repairman.user.id
            }
        }
        if (payload.data.txtDescription !== undefined) {
            data.description = payload.data.txtDescription
        }
        if (payload.data.txtReturnDate !== undefined) {
            data.returnDate = payload.data.txtReturnDate
        }
        for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
            let product = {
                product: {
                    id: createMaintenanceCard1.products[i].id
                },
            }
            if (createMaintenanceCard1.products[i].warranty === 1) {
                product.price = 0;
            }
            else {
                product.price = createMaintenanceCard1.products[i].pricePerUnit;
            }
            product.quantity = createMaintenanceCard1.products[i].amount;
            data.maintenanceCardDetails.push(product);
        }

        console.log(data);
        try {
            const res = yield call(createMaintenanceCard, data);
            if (res.status === STATUS_CODE.SUCCESS) {
                yield put(actCreateMaintenanceCardSuccess(res.data))
            }
            if (res.status === 409) {
                yield put(actCreateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
            }
            if (res.status === 400) {
                yield put(actCreateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
            }
        }
        catch (e) {
            console.log(e.response);
            if (e.response.status === 409) {
                yield put(actCreateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
            }
            else if (e.response.status === 400) {
                yield put(actCreateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
            }
            else{
                yield put(actCreateMaintenanceCardFailed("Tạo phiếu thất bại"))
            }
        }

    }
    else {
        yield put(actError(error, payload.data))
    }


}
export function* updateMaintenanceCardSaga({ payload }) {
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    let data;
    data = {
        id: createMaintenanceCard1.id,
        platesNumber: payload.data.txtPlatesNumber,
        customer: {
            id: createMaintenanceCard1.customerItem.id
        },
        coordinator: {
            id: createMaintenanceCard1.coordinator.id
        },
        maintenanceCardDetails: [],
    }
    if (payload.data.txtCode !== undefined) {
        data.code = payload.data.txtCode
    }
    if (payload.data.txtModel !== undefined) {
        data.model = payload.data.txtModel
    }
    if (payload.data.txtColor !== undefined) {
        data.color = payload.data.txtColor
    }
    if (createMaintenanceCard1.repairman.user.id !== undefined) {
        data.repairman = {
            id: createMaintenanceCard1.repairman.user.id
        }
    }
    if (payload.data.txtDescription !== undefined) {
        data.description = payload.data.txtDescription
    }
    if (payload.data.txtReturnDate !== undefined) {
        data.returnDate = payload.data.txtReturnDate
    }
    for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
        let product = {
            product: {
                id: createMaintenanceCard1.products[i].id
            },
        }
        if (createMaintenanceCard1.products[i].warranty === 1) {
            product.price = 0;
        }
        else {
            product.price = createMaintenanceCard1.products[i].pricePerUnit;
        }
        product.id = createMaintenanceCard1.products[i].maintenanceCardDetailId;
        product.quantity = createMaintenanceCard1.products[i].amount;
        data.maintenanceCardDetails.push(product);
    }

    console.log(data);
    try {
        const res = yield call(updateMaintenanceCard, data);
        console.log(res);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actUpdateMaintenanceCardSuccess(res.data))
        }
        else {
            yield put(actUpdateMaintenanceCardFailed())
        }
    }
    catch (e) {
        console.log(e.response);
        if (e.response.status === 409) {
            yield put(actUpdateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
        }
        else if (e.response.status === 400) {
            yield put(actUpdateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
        }
        else if (e.response.status === 404) {
            yield put(actUpdateMaintenanceCardFailed("Không tìm thấy phiếu sửa chữa"))
        }
        else{
            yield put(actUpdateMaintenanceCardFailed("Tạo phiếu thất bại"))
        }
    }

}

export function* getMaintenanceCardByIdSaga({ payload }) {
    try {
        const res = yield call(fetchMaintenanceCardById, payload.id);
        yield put(actFetchMaintenanceCardByIdSuccess(res.data))
    }
    catch (e) {

    }
}

export function* completeCardSaga({ payload }) {
    try {
        const res = yield call(completeCard, payload.data);
        yield put(actCompleteCardSuccess())
    }
    catch (e) {
        console.log(e);
        
    }
}

export function* updateStatusDetailSaga({ payload }) {
    try {
        const res = yield call(updateStatusDetail, payload.data);
        console.log(res.data);
        yield put(actUpdateStatusDetailSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        if(e.response.status === 404){
            yield put(actUpdateStatusDetailFailed("Không tìm thấy dịch vụ"))
        }
        else{
            yield put(actUpdateStatusDetailFailed("Thay đổi trạng thái thất bại"))
        }
    }
}


export function* createPaymentHistorySaga({ payload }) {

    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    let data = {
        maintenanceCard: {
            id:createMaintenanceCard1.id
        },
        paymentMethod:{
            id: payload.data.txtPaymentMethod,
        },
        money: payload.data.txtMoney,
    }
    try {
        const res = yield call(createPaymentHistory, data);
        console.log(res);
        yield put(actCreatePaymentHistorySuccess(res.data))
    }
    catch (e) {
        console.log(e.response);
        
    }
}

