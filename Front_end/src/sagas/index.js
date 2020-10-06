import { takeLatest } from 'redux-saga/effects';
import {createCustomerSaga, getCustomerSaga, getCustomerByIdSaga, updateCustomerSaga,deleteCustomerSaga,updateMultipleStatusCustomerSaga, filterPayStatusOfCustomerSaga } from './Customer'
import * as customerConstants from '../constants/customer';
import * as addressConstants from '../constants/address'
import * as MaintenanceCardType from '../constants/maintenanceCard'
import * as MaintenanceCardAddType from '../constants/MaintenanceCardAdd'
import * as servicesConstants from '../constants/services';
import * as serviceConstants from '../constants/service';
import * as accessoriesConstants from '../constants/accessories';
import * as accessoryConstants from '../constants/accessory';
import * as employeeConstants from "../constants/employee"
import { getMaintenanceCardSaga, getMaintenanceCardByCustomerSaga } from './MaintenanceCard'
import { getProvincesSaga, getWardsOfDistrictSaga } from './Address'
import {
    searchCustomerMaintenanceCardSaga, createCustomerRepairSaga, searchRepairmanSaga, searchProductSaga,
    createMaintenanceCardSaga, updateListCustomerMaintenanceCardSaga, updateListRepairmanMaintenanceCardSaga, updateListProductSaga,
    getMaintenanceCardByIdSaga,updateMaintenanceCardSaga,completeCardSaga,updateStatusDetailSaga,createPaymentHistorySaga
} from './MaintenanceCardAdd'
import { fetchEmployeeSaga, deleteEmployeeSaga, getItemByIdSaga, updateEmployeeSaga, insertEmployeeSaga, changePasswordUserSaga,getListMaintanceCardByUserIdSaga } from "./Employee"
import { getAccessoriesSaga} from './Accessories'
import { getServicesSaga } from './Services';
import * as UserContraint from  "../constants/users"
import { createAccessorySaga, deleteAccessorySaga, getAccessorySaga, updateAccessorySaga } from './Accessory';
import { createServiceSaga, getServiceSaga, updateServiceSaga } from './Service';
import{loginSaga} from "./users"
function* rootSaga() {
    yield takeLatest(MaintenanceCardAddType.SEARCH_CUSTOMER, searchCustomerMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_CUSTOMER, updateListCustomerMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_REPAIRMAN, updateListRepairmanMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_CUSTOMER, createCustomerRepairSaga)
    yield takeLatest(MaintenanceCardAddType.SEARCH_REPAIRMAN, searchRepairmanSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_PRODUCT, updateListProductSaga)
    yield takeLatest(MaintenanceCardAddType.SEARCH_PRODUCT, searchProductSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_MAINTENANCE_CARD, createMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD, updateMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_MAINTENANCE_CARD_BY_ID, getMaintenanceCardByIdSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_STATUS_DETAIL, updateStatusDetailSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_PAYMENT_HISTORY, createPaymentHistorySaga)
    yield takeLatest(MaintenanceCardAddType.COMPLETE_CARD, completeCardSaga)
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD, getMaintenanceCardSaga)
    yield takeLatest(customerConstants.FETCH_CUSTOMER, getCustomerSaga);
    yield takeLatest(customerConstants.CREATE_CUSTOMER, createCustomerSaga);
    yield takeLatest(accessoriesConstants.FETCH_ACCESSORIES, getAccessoriesSaga);
    yield takeLatest(accessoryConstants.FETCH_ACCESSORY, getAccessorySaga);
    yield takeLatest(accessoryConstants.CREATE_ACCESSORY, createAccessorySaga);
    yield takeLatest(accessoryConstants.UPDATE_ACCESSORY, updateAccessorySaga);
    yield takeLatest(accessoryConstants.UPDATE_ACCESSORY, updateAccessorySaga);
    yield takeLatest(accessoryConstants.DELETE_ACCESSORY, deleteAccessorySaga);
    yield takeLatest(servicesConstants.FETCH_SERVICES, getServicesSaga);
    yield takeLatest(serviceConstants.FETCH_SERVICE, getServiceSaga);
    yield takeLatest(serviceConstants.CREATE_SERVICE, createServiceSaga);
    yield takeLatest(serviceConstants.UPDATE_SERVICE, updateServiceSaga);
    yield takeLatest(customerConstants.FETCH_CUSTOMER_BY_ID, getCustomerByIdSaga);
    yield takeLatest(addressConstants.FETCH_PROVINCES, getProvincesSaga);
    yield takeLatest(addressConstants.FETCH_WARD_OF_DISTRICT, getWardsOfDistrictSaga);
    yield takeLatest(customerConstants.DELETE_CUSTOMER, deleteCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER, updateMultipleStatusCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_CUSTOMER, updateCustomerSaga);
    yield takeLatest(employeeConstants.FETCH_EMPLOYEE,fetchEmployeeSaga);
    yield takeLatest(employeeConstants.DELETE_EMPLOYEE,deleteEmployeeSaga);
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER, getMaintenanceCardByCustomerSaga)
    yield takeLatest(customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS, filterPayStatusOfCustomerSaga)
    yield takeLatest(employeeConstants.CREATE_EMPLOYEE,insertEmployeeSaga);
    yield takeLatest(employeeConstants.CHANGE_PASSWORD_USER,changePasswordUserSaga);
    yield takeLatest(employeeConstants.GET_MAINTENANCECARD_BY_USER_ID,getListMaintanceCardByUserIdSaga)
    yield takeLatest(UserContraint.LOGIN,loginSaga)
 
}

export default rootSaga;