import { call, delay, put, select } from 'redux-saga/effects'
import { getCouponPage } from "../apis/coupon";
import { getStorePage } from "../apis/store";
import { getListService } from "../apis/service";
import { actFetchDataListServiceSuccess, actFetchListDataService } from "../actions/maintenanceCardAdd";
import {getCategories,searchProductByManufactureIdAndCategoriesId,
    searchCustomer, createCustomer, searchRepairman, searchProduct, createMaintenanceCard, fetchMaintenanceCardById,
    updateMaintenanceCard, completeCard, updateStatusDetail, createPaymentHistory, deleteMaintenanceCard,
    getSuggestRepairMan,getManufactureList,getModelBikeByManufactureId,getColorBikeByModelBikeId,fetchMinTimeLeft
} from '../apis/maintenanceCardAdd'
import {actUpdateReturned,actCommentDelete,actFetchCategoriesSuccess,actFetchProductByManufactureIdAndCategoriesIdSuccess,
    actCreateCustomerFailed, actCreateCustomerSuccess, actSearchCustomerSuccess,
    actSearchRepairmanSuccess, actSearchProductSuccess, actError,
    actCreateMaintenanceCardSuccess, actCreateMaintenanceCardFailed, actUpdateListCustomerSuccess, actUpdateListRepairmanSuccess,
    actFetchMaintenanceCardByIdSuccess, actUpdateListProductSuccess, actUpdateMaintenanceCardSuccess, actUpdateMaintenanceCardFailed, actCompleteCardSuccess,
    actUpdateStatusDetailSuccess, actUpdateStatusDetailFailed, actCreatePaymentHistorySuccess, actFetchMaintenanceCardByIdFailed,
    actFetchMaintenanceCardById, actFetchSuggestRepairManSuccess, actFetchSuggestRepairMan, actFetchDataStoreSucess, actFetchCouponSuccess
    , actUpdateListService, actUpdateListServiceSuccess, actGetManufactureSuccess, actModelBikeSuccess, actColorBikeSuccess,actGetMinTimeLeftEmployeeSuccess
} from '../actions/maintenanceCardAdd'
import { STATUS_CODE } from '../constants/api';
import history from '../history'
import { message } from 'antd';
export function* searchCustomerMaintenanceCardSaga({ payload }) {
    yield delay(500)
    try {
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
    console.log(payload)
    try {
        const res = yield call(createCustomer, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actCreateCustomerSuccess(res.data))
        }
        else {
            yield put(actCreateCustomerFailed(res.data))
        }
    }
    catch (error) {
       if(error.response != undefined){
           console.log(error.response.data)
           yield put(actCreateCustomerFailed(error.response.data));
       }
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
export function* searchProductByManufactureIdAndCategoriesIdSaga({ payload }) {

    try {
        const res = yield call(searchProductByManufactureIdAndCategoriesId, payload.key, payload.page, payload.size,payload.manufactureId,payload.categoriesId);
        yield put(actFetchProductByManufactureIdAndCategoriesIdSuccess(res.data))
    }
    catch (e) {

    }
}

export function* updateListServiceSaga({ payload }) {
    yield delay(500)
    try {
        const page = yield select(state => state.maintenanceCardAdd.currentServicePage)
        const res = yield call(getListService, payload.data, page + 1, 7);
        console.log(res);
        yield put(actUpdateListServiceSuccess(res.data))
    }
    catch (e) {
        console.log(e);
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
    console.log(payload);
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);

    const user = yield select(state => state.userReducer);
    let data;
    let error = [];
    if (createMaintenanceCard1.customerItem.id === undefined) {
        console.log("customerError-Saga");
        error.push('customerError')
    }

    if (createMaintenanceCard1.worker.user === undefined) {
        console.log("repairmanError-Saga");
        error.push('repairmanError');
    }

    if (error.length === 0 && payload.check) {
        data = {
            platesNumber: payload.data.platesNumber,
            customer: {
                id: createMaintenanceCard1.customerItem.id
            },
            coordinator: {
                id: user.id
            },
            maintenanceCardDetails: [],
            coupon: null,
            store: {},
            workStatus: 0,
            colorBike: null,
            model:null,
            color:null
        }
        if(payload.data.colorBike.id !== undefined){
            data.colorBike = payload.data.colorBike;
        }
        if (payload.data.code !== undefined) {
            data.code = payload.data.code
        }
        if (payload.data.model !== undefined) {
            data.model = payload.data.model
        }
        if (payload.data.color !== undefined) {
            data.color = payload.data.color
        }
        if (createMaintenanceCard1.worker.user.id !== undefined) {
            data.repairman = {
                id: createMaintenanceCard1.worker.user.id
            }
        } else {
            message.error('Vui lòng chọn nhân viên sửa chữa');
        }

        if (payload.data.description !== undefined) {
            data.description = payload.data.description
        }
        if (payload.data.coupon != undefined) {

            if (payload.data.coupon.id !== undefined) {
                data.coupon = payload.data.coupon;
            }
        }

        if (payload.data.store != undefined) {
            data.store = payload.data.store;
        }

        let services = createMaintenanceCard1.listService;
        let products = createMaintenanceCard1.products;

        console.log("products", products);
        if (products.length >= services.length) {
            for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
                let product = {
                    product: {
                        id: createMaintenanceCard1.products[i].id
                    },
                    service: null,
                    quantity: 0
                }
                if (createMaintenanceCard1.products[i].warranty === 1) {
                    product.price = 0;
                }
                else {
                    product.price = createMaintenanceCard1.products[i].pricePerUnit;
                }
                product.quantity = createMaintenanceCard1.products[i].amount;
                console.log(product);
                data.maintenanceCardDetails.push(product);
            }
            for (let i = 0; i < data.maintenanceCardDetails.length; i++) {
                let sv = null;
                if (data.maintenanceCardDetails.service == null) {
                    for (let j = 0; j < services.length; j++) {
                        if (i == j) {
                            sv = services[i];
                            data.maintenanceCardDetails[i].service = sv;

                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < services.length; i++) {
                let product = {
                    product: null,
                    service: services[i],
                    quantity: 0
                }

                data.maintenanceCardDetails.push(product);
            }
            for (let i = 0; i < data.maintenanceCardDetails.length; i++) {
                let pd = null;
                if (data.maintenanceCardDetails.product == null) {
                    for (let j = 0; j < products.length; j++) {
                        if (i == j) {
                            pd = products[i];
                            data.maintenanceCardDetails[i].product = pd;
                            data.maintenanceCardDetails[i].quantity = pd.amount;
                        }
                    }
                }
            }
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
            if (res.status === 404) {
                yield put(actCreateMaintenanceCardFailed(res.data))
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
            if (e.response.status === 404) {
                yield put(actCreateMaintenanceCardFailed(e.response.data))
            }
            else {
                yield put(actCreateMaintenanceCardFailed("Tạo phiếu thất bại"))
            }
        }

    }
    else {
        yield put(actError(error, payload.data))
    }


}
export function* updateMaintenanceCardSaga({ payload }) {
    console.log("payload",payload)
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);

    let data;
    data = {
        id: createMaintenanceCard1.id,
        platesNumber: payload.data.platesNumber,
        customer: {
            id: createMaintenanceCard1.customerItem.id
        },
        coordinator: {
            id: createMaintenanceCard1.coordinator.id
        },
        maintenanceCardDetails: [],
        coupon: null,
        store: null,
        description: "",
        model: "",
        timeLeft: 0,
        returned: false,
        colorBike: null,
        returnDateCustomer:null
    }
    if(payload.data.colorBike.id !== undefined){
        data.colorBike = payload.data.colorBike;
    }
    if (payload.data.returned != undefined) {
        data.returned = payload.data.returned;
    }
    if(payload.data.returnDateCustomer != undefined && payload.data.returnDateCustomer != null){
        data.returnDateCustomer = payload.data.returnDateCustomer;
    }
    if (payload.data.code !== undefined) {
        data.code = payload.data.code
    }
    if (payload.data.code !== undefined) {
        data.model = payload.data.model
    }
    if (payload.data.code !== undefined) {
        data.color = payload.data.color
    }

    console.log(createMaintenanceCard1.repairman);
    if (createMaintenanceCard1.repairman.user.id !== undefined) {
        data.repairman = {
            id: createMaintenanceCard1.repairman.user.id
        }
    }
    if (payload.data.Description !== undefined) {
        data.description = payload.data.description
    }

    if (payload.data.store != undefined || payload.data.store != null) {
        data.store = payload.data.store;
    }
    if (payload.data.coupon != undefined || payload.data.coupon != null) {
        data.coupon = payload.data.coupon;
    }
    let services = createMaintenanceCard1.listService;
    let products = createMaintenanceCard1.products;
    if (products.length >= services.length) {
        for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
            let product = {
                product: createMaintenanceCard1.products[i],
                service: null,
                quantity: 0,
                free:false
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
        for (let i = 0; i < data.maintenanceCardDetails.length; i++) {
            console.log(data.maintenanceCardDetails[i]);
            let sv = null;
            if (data.maintenanceCardDetails[i].service == null) {
                //     console.log(data.maintenanceCardDetails[i].service);
                for (let j = 0; j < services.length; j++) {
                    if (i == j) {
                        if (i < services.length) {
                            sv = services[j];
                            let isFree = services[j].free;
                            let indexService = findService(sv.id, data.maintenanceCardDetails);
                            if (indexService === -1) {
                                data.maintenanceCardDetails[i].service = sv;
                                data.maintenanceCardDetails[i].free = isFree;
                            }
                        }

                    }

                }
            }
        }

    } else {
        for (let i = 0; i < services.length; i++) {
            let product = {
                product: null,
                service: services[i],
                quantity: 0,
                free: false
            }
            product.id = services[i].maintenanceCardDetailId;
            product.free = services[i].free
            data.maintenanceCardDetails.push(product);
        }
        for (let i = 0; i < data.maintenanceCardDetails.length; i++) {
            let pd = null;
            if (data.maintenanceCardDetails.product == null) {
                for (let j = 0; j < products.length; j++) {
                    if (i == j) {
                        pd = products[i];
                        data.maintenanceCardDetails[i].product = pd;
                        data.maintenanceCardDetails[i].quantity = pd.amount;
                    }
                }
            }
        }
    }

    console.log("data",data);
    try {
        const res = yield call(updateMaintenanceCard, data);

        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actUpdateMaintenanceCardSuccess(res.data))
        }
        else {
            yield put(actUpdateMaintenanceCardFailed())
        }
    }
    catch (e) {
        console.log(e.response);
        if (e.response != undefined) {
            if (e.response.status === 409) {
                yield put(actUpdateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
            }
            else if (e.response.status === 400) {
                yield put(actUpdateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
            }
            else if (e.response.status === 404) {
                yield put(actUpdateMaintenanceCardFailed("Không tìm thấy phiếu sửa chữa"))
            }
            else {
                yield put(actUpdateMaintenanceCardFailed("Cập nhật phiếu thất bại"))
            }
        }
    }
}

export function* getMaintenanceCardByIdSaga({ payload }) {
    try {
        const res = yield call(fetchMaintenanceCardById, payload.id);

        yield put(actFetchMaintenanceCardByIdSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        yield put(actFetchMaintenanceCardByIdFailed())
        history.push("/admin/maintenanceCards")
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

        yield put(actUpdateStatusDetailSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        if (e.response != undefined) {
            if (e.response.status === 404) {
                yield put(actUpdateStatusDetailFailed("Không tìm thấy dịch vụ"))
            }
            else if (e.response.status === 405) {
                yield put(actUpdateStatusDetailFailed("Phiếu chưa có nhân viên sửa chữa"))
            }
            else {
                yield put(actUpdateStatusDetailFailed("Thay đổi trạng thái thất bại"))
            }
        }

    }
}


export function* createPaymentHistorySaga({ payload }) {

    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    let data1 = []
    let data = {
        maintenanceCard: {
            id: createMaintenanceCard1.id
        },
        paymentMethod: {
            id: payload.data.txtPaymentMethod,
        },
        money: payload.data.txtMoney,
    }
    data1.push(data)
    if (payload.data.txtPaymentMethod2 !== undefined) {
        data = {
            maintenanceCard: {
                id: createMaintenanceCard1.id
            },
            paymentMethod: {
                id: payload.data.txtPaymentMethod2,
            },
            money: payload.data.txtMoney2,
        }
        data1.push(data)
    }
    console.log(data1);
    try {
        const res = yield call(createPaymentHistory, data1);
        console.log(res);
        yield put(actCreatePaymentHistorySuccess(res.data))
    }
    catch (e) {
        console.log(e.response);
        if(e.response != undefined){
            message.error("Số tiền thanh toán vượt quá số tiền cần thanh toán")
        }

        yield put(actFetchMaintenanceCardById(createMaintenanceCard1.id))
    }
}

export function* deleteMaintenanceCardSaga({ payload }) {
    try {
        const res = yield call(deleteMaintenanceCard, payload.data);
        message.success("Đã hủy phiếu thành công");
        history.push("/admin/maintenanceCards")
    }
    catch (e) {
        console.log(e);
        if (e.response.status === 404) {
            yield put(actUpdateStatusDetailFailed("Không thể hủy phiếu do đã thanh toán hoặc đã bắt đầu sửa chữa"))
        }
    }
}

export function* createMaintenanceCardWithCustomerSaga({ payload }) {
    history.push("/admin/maintenanceCards/create")
}
export function* fetchSuggestRepairManSaga({ payload }) {
    try {
        const res = yield call(getSuggestRepairMan, payload.page, payload.size)
        yield put(actFetchSuggestRepairManSuccess(res.data));
    } catch (error) {

    }
}
export function* fetchListDataService({ payload }) {
    try {
        const res = yield call(getListService, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);

        yield put(actFetchDataListServiceSuccess(res.data));
    } catch (error) {

    }
}
export function* fetchListStoreSaga({ payload }) {
    try {
        const res = yield call(getStorePage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actFetchDataStoreSucess(res.data));
    } catch (error) {

    }
}

export function* fetchListCouponSaga({ payload }) {
    try {
        const res = yield call(getCouponPage, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actFetchCouponSuccess(res.data));
    } catch (error) {

    }
}


const findService = (id, list) => {
    let index11 = -1;
    for (let i = 0; i < list.length; i++) {

        if (list[i].service != null || list[i].service != undefined) {
            if (list[i].service.id === id) {
                index11 = i;
                break;
            }
        }

    }
    return index11;
}
export function* getManufactureSaga({ payload }) {
    console.log(payload);
    try {
        const res = yield call(getManufactureList,payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        yield put(actGetManufactureSuccess(res.data));
    } catch (error) {

    }
}
export function* getModelBikeByManufactureIdSaga({ payload }) {
    try {
        const res = yield call(getModelBikeByManufactureId,payload.id);
        yield put(actModelBikeSuccess(res.data));
    } catch (error) {

    }
}
export function* getColorBikeByModelBikeIdSaga({ payload }) {
    try {
        const res = yield call(getColorBikeByModelBikeId,payload.id);
        yield put(actColorBikeSuccess(res.data));
    } catch (error) {

    }
}
export function* getMinTimeLeftEmployeeSaga({ payload }) {
    try {
        const res = yield call(fetchMinTimeLeft,payload.id);
        yield put(actGetMinTimeLeftEmployeeSuccess(res.data));
    } catch (error) {

    }
}
export function* updateReturned({ payload }) {
    console.log("returned")
    yield put(actUpdateReturned(payload.data));
}

export function* commentDelete({ payload }) {

    yield put(actCommentDelete(payload.data));
}
export function* getCategoriesMaintenaceCard() {
    try {
        const res = yield  call(getCategories);
        yield put(actFetchCategoriesSuccess(res.data));
    }catch (error){
        console.log(error)
    }

}

