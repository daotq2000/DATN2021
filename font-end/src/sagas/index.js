import { takeLatest } from 'redux-saga/effects';
import { createCustomerSaga, getCustomerSaga, getCustomerByIdSaga, updateCustomerSaga, deleteCustomerSaga, updateMultipleStatusCustomerSaga, filterPayStatusOfCustomerSaga } from './Customer'
import * as customerConstants from '../constants/customer';
import * as addressConstants from '../constants/address'
import * as MaintenanceCardType from '../constants/maintenanceCard'
import * as MaintenanceCardAddType from '../constants/MaintenanceCardAdd'
import * as accessoriesConstants from '../constants/accessories';
import * as accessoryConstants from '../constants/accessory';
import * as employeeConstants from "../constants/employee";
// import * as supplierConstants from "../constants/supplier";
import * as ManufacturerConstraint from "../constants/manufacturer";
import * as CategoryConstraint from "../constants/category";
import * as ColorBikerConstraint from "../constants/colorBike";
import * as ModelbikeConstraint from "../constants/modelBike";
import * as storeConstants from "../constants/store";
import * as serviceConstants from "../constants/service";
import * as couponConstants from "../constants/coupon";
import * as statisticConstants from "../constants/statistic";
import * as paymentConstants from "../constants/paymentHistories";
import { getMaintenanceCardSaga, getMaintenanceCardByCustomerSaga } from './MaintenanceCard'
import { getProvincesSaga, getWardsOfDistrictSaga } from './Address'
import {getCategoriesMaintenaceCard,searchProductByManufactureIdAndCategoriesIdSaga,
    searchCustomerMaintenanceCardSaga, createCustomerRepairSaga, searchRepairmanSaga, searchProductSaga,
    createMaintenanceCardSaga, updateListCustomerMaintenanceCardSaga, updateListRepairmanMaintenanceCardSaga, updateListProductSaga,
    getMaintenanceCardByIdSaga, updateMaintenanceCardSaga, completeCardSaga, updateStatusDetailSaga, createPaymentHistorySaga, deleteMaintenanceCardSaga,
    createMaintenanceCardWithCustomerSaga,fetchSuggestRepairManSaga,fetchListDataService,fetchListStoreSaga,fetchListCouponSaga, updateListServiceSaga,
    getManufactureSaga,getColorBikeByModelBikeIdSaga,getModelBikeByManufactureIdSaga
} from './MaintenanceCardAdd'

import { fetchEmployeeSaga, deleteEmployeeSaga, getItemByIdSaga, updateEmployeeSaga, insertEmployeeSaga, changePasswordUserSaga, getListMaintanceCardByUserIdSaga } from "./Employee"
import { fetchStoreSaga, deleteStoreSaga, getStoreItemByIdSaga, updateStoreSaga, insertStoreSaga,} from "./Store"
import { fetchServiceSaga, deleteServiceSaga, getServiceItemByIdSaga, updateServiceSaga, insertServiceSaga,} from "./Services"
import { fetchCouponSaga, deleteCouponSaga, getCouponItemByIdSaga, updateCouponSaga, insertCouponSaga,} from "./Coupon"
import { getAccessoriesSaga } from './Accessories'
import { getItemManufacturerByIdSaga,deleteManufacturerSaga,fetchManufacturerSaga,insertManufacturerSaga,updateManufacturerSaga } from './Manufacturer';
import { getItemCategoryByIdSaga,deleteCategorySaga,fetchCategorySaga,insertCategorySaga,updateCategorySaga } from './Category';
import { getItemModelbikeByIdSaga,deleteModelbikeSaga,fetchModelbikeSaga,insertModelbikeSaga,updateModelbikeSaga } from './ModelBike';
import {deleteColorBikeSaga,fetchColorBikeSaga,getItemColorBikeByIdSaga,insertColorBikeSaga,updateColorBikeSaga} from './ColorBike';
 
import * as UserContraint from "../constants/users"
import { createAccessorySaga, deleteAccessorySaga, getAccessorySaga, updateAccessorySaga } from './Accessory';
import { checkUserSaga, loginSaga } from "./users"
import { getTotalTodaySaga,getTotalMoneySaga,getTopRepairManSaga,getTopServiceSaga } from "./statistic";
import { getPaymentHistoriesSaga } from "./paymentHistories";

import * as productsConstants from '../constants/products';
import * as productConstants from '../constants/product';
import { deleteProductsSaga, getProductsSaga,getCategoriesProductSaga,getManufactureProductSaga } from './Products';
import { getProductSaga } from './Product';

import {getMinTimeLeftEmployeeSaga,updateReturned,commentDelete}from './MaintenanceCardAdd'

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
    yield takeLatest(MaintenanceCardAddType.DELETE_MAINTENANCE_CARD, deleteMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_MAINTENANCE_CARD_WITH_CUSTOMER, createMaintenanceCardWithCustomerSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_SUGGEST_REPAIRMAN, fetchSuggestRepairManSaga)
    yield takeLatest(MaintenanceCardAddType.COMPLETE_CARD, completeCardSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_STORE, fetchListStoreSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_COUPON,fetchListCouponSaga)
    yield takeLatest(MaintenanceCardAddType.COMMENT_DELETE,fetchListCouponSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_PRODUCT_BY_MANUFACTURE_ID_AND_CATEGORIES_ID,searchProductByManufactureIdAndCategoriesIdSaga)

    yield takeLatest(MaintenanceCardAddType.FETCH_COUPON,commentDelete)
    yield takeLatest(MaintenanceCardAddType.FETCH_CATEGORY,getCategoriesMaintenaceCard)

    yield takeLatest(MaintenanceCardAddType.SEARCH_SERVICE,fetchListDataService)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_SERVICE,updateListServiceSaga)
    yield takeLatest(MaintenanceCardAddType.FECTCH_MANUFUCTURE,getManufactureSaga)
    yield takeLatest(MaintenanceCardAddType.FECTCH_MODEL_BIKE,getModelBikeByManufactureIdSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_COLOR_BIKE,getColorBikeByModelBikeIdSaga)
    yield takeLatest(MaintenanceCardAddType.MIN_TIME_LEFT_REPAIRMAN,getMinTimeLeftEmployeeSaga)
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD, getMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD, getMaintenanceCardSaga)
    yield takeLatest(customerConstants.FETCH_CUSTOMER, getCustomerSaga);
    yield takeLatest(customerConstants.CREATE_CUSTOMER, createCustomerSaga);
    yield takeLatest(accessoriesConstants.FETCH_ACCESSORIES, getAccessoriesSaga);
    yield takeLatest(accessoryConstants.FETCH_ACCESSORY, getAccessorySaga);
    yield takeLatest(accessoryConstants.CREATE_ACCESSORY, createAccessorySaga);
    yield takeLatest(accessoryConstants.UPDATE_ACCESSORY, updateAccessorySaga);
    yield takeLatest(accessoryConstants.DELETE_ACCESSORY, deleteAccessorySaga);
    yield takeLatest(accessoryConstants.FETCH_CATEGORIES, getCategoriesProductSaga);
    yield takeLatest(accessoryConstants.FETCH_MANUFACTURE, getManufactureProductSaga);

    yield takeLatest(customerConstants.FETCH_CUSTOMER_BY_ID, getCustomerByIdSaga);
    yield takeLatest(addressConstants.FETCH_PROVINCES, getProvincesSaga);
    yield takeLatest(addressConstants.FETCH_WARD_OF_DISTRICT, getWardsOfDistrictSaga);
    yield takeLatest(customerConstants.DELETE_CUSTOMER, deleteCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER, updateMultipleStatusCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_CUSTOMER, updateCustomerSaga);
    yield takeLatest(employeeConstants.FETCH_EMPLOYEE, fetchEmployeeSaga);
    yield takeLatest(employeeConstants.DELETE_EMPLOYEE, deleteEmployeeSaga);
    yield takeLatest(employeeConstants.CREATE_EMPLOYEE, insertEmployeeSaga);
    yield takeLatest(employeeConstants.CHANGE_PASSWORD_USER, changePasswordUserSaga);
    yield takeLatest(employeeConstants.GET_MAINTENANCECARD_BY_USER_ID, getListMaintanceCardByUserIdSaga)
    yield takeLatest(storeConstants.FETCH_STORE, fetchStoreSaga);
    yield takeLatest(storeConstants.DELETE_STORE, deleteStoreSaga);
    yield takeLatest(storeConstants.CREATE_STORE, insertStoreSaga);
    yield takeLatest(serviceConstants.FETCH_ALL_SERVICE, fetchServiceSaga);
    yield takeLatest(serviceConstants.DELETE_SERVICE, deleteServiceSaga);
    yield takeLatest(serviceConstants.CREATE_SERVICE, insertServiceSaga);
    yield takeLatest(couponConstants.FETCH_COUPON, fetchCouponSaga);
    yield takeLatest(couponConstants.DELETE_COUPON, deleteCouponSaga);
    yield takeLatest(couponConstants.CREATE_COUPON, insertCouponSaga);
    // yield takeLatest(supplierConstants.FETCH_SUPPLIER, fetchSupplierSaga);
    // yield takeLatest(supplierConstants.DELETE_SUPPLIER, deleteSupplierSaga);
    // yield takeLatest(supplierConstants.CREATE_SUPPLIER, insertSupplierSaga);
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER, getMaintenanceCardByCustomerSaga)
    yield takeLatest(customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS, filterPayStatusOfCustomerSaga)

    yield takeLatest(UserContraint.LOGIN, loginSaga);
    yield takeLatest(statisticConstants.FETCH_TOTAL_TODAY, getTotalTodaySaga);
  //  yield takeLatest(UserContraint.CHECK_USER, checkUserSaga);
    yield takeLatest(statisticConstants.FETCH_TOTAL_MONEY, getTotalMoneySaga);
    yield takeLatest(employeeConstants.GET_ITEM_EMPLOYEE, getItemByIdSaga);
    yield takeLatest(employeeConstants.UPDATE_EMPLOYEE, updateEmployeeSaga);
    yield takeLatest(storeConstants.GET_STORE_ITEM, getStoreItemByIdSaga);
    yield takeLatest(storeConstants.UPDATE_STORE, updateStoreSaga);
    yield takeLatest(serviceConstants.GET_SERVICE, getServiceItemByIdSaga);
    yield takeLatest(serviceConstants.UPDATE_SERVICE, updateServiceSaga);
    yield takeLatest(couponConstants.GET_COUPON_ITEM, getCouponItemByIdSaga);
    yield takeLatest(couponConstants.UPDATE_COUPON, updateCouponSaga);
    // yield takeLatest(supplierConstants.GET_ITEM_SUPPLIER, getItemByIdSaga1);
    // yield takeLatest(supplierConstants.UPDATE_SUPPLIER, updateSupplierSaga);
    yield takeLatest(statisticConstants.FETCH_TOP_REPAIRMAN, getTopRepairManSaga);
    yield takeLatest(statisticConstants.FETCH_TOP_SERVICE, getTopServiceSaga);
    yield takeLatest(productsConstants.FETCH_PRODUCTS, getProductsSaga);
    yield takeLatest(paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER, getPaymentHistoriesSaga);
    yield takeLatest(productsConstants.DELETE_PRODUCTS, deleteProductsSaga);
    yield takeLatest(productConstants.FETCH_PRODUCT, getProductSaga);


    yield takeLatest(ManufacturerConstraint.FETCH_MANUFACTURER,fetchManufacturerSaga);
    yield takeLatest(ManufacturerConstraint.CREATE_MANUFACTURER,insertManufacturerSaga);
    yield takeLatest(ManufacturerConstraint.GET_MANUFACTURER_ITEM,getItemManufacturerByIdSaga);
    yield takeLatest(ManufacturerConstraint.DELETE_MANUFACTURER,deleteManufacturerSaga);
    yield takeLatest(ManufacturerConstraint.UPDATE_MANUFACTURER,updateManufacturerSaga);

    yield takeLatest(CategoryConstraint.FETCH_CATEGORY,fetchCategorySaga);
    yield takeLatest(CategoryConstraint.CREATE_CATEGORY,insertCategorySaga);
    yield takeLatest(CategoryConstraint.GET_CATEGORY_ITEM,getItemCategoryByIdSaga);
    yield takeLatest(CategoryConstraint.DELETE_CATEGORY,deleteCategorySaga);
    yield takeLatest(CategoryConstraint.UPDATE_CATEGORY,updateCategorySaga);

    yield takeLatest(ModelbikeConstraint.FETCH_MODELBIKE,fetchModelbikeSaga);
    yield takeLatest(ModelbikeConstraint.CREATE_MODELBIKE,insertModelbikeSaga);
    yield takeLatest(ModelbikeConstraint.GET_MODELBIKE_ITEM,getItemModelbikeByIdSaga);
    yield takeLatest(ModelbikeConstraint.DELETE_MODELBIKE,deleteModelbikeSaga);
    yield takeLatest(ModelbikeConstraint.UPDATE_MODELBIKE,updateModelbikeSaga);

    yield takeLatest(ColorBikerConstraint.FETCH_COLORBIKE,fetchColorBikeSaga);
    yield takeLatest(ColorBikerConstraint.CREATE_COLORBIKE, insertColorBikeSaga);
    yield takeLatest(ColorBikerConstraint.GET_COLORBIKE_ITEM, getItemColorBikeByIdSaga);
    yield takeLatest(ColorBikerConstraint.DELETE_COLORBIKE, deleteColorBikeSaga);
    yield takeLatest(ColorBikerConstraint.UPDATE_COLORBIKE, updateColorBikeSaga);
}

export default rootSaga;