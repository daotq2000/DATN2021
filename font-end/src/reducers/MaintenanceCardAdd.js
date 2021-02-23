import * as CreateMaintenanceCardType from '../constants/MaintenanceCardAdd'
import {message} from 'antd';
import {v4 as uuidv4} from 'uuid';
import {stat} from 'fs';
import {duration} from '@material-ui/core';

var initialState = {
    customers: [],
    customerPage: 0,
    totalCustomerPage: 0,
    customerItem: {},
    listRepairman: [],
    repairmanPage: 1,
    totalRepairman: 0,
    returnDate: null,
    repairman: {
        user: {},
        edit: true
    },
    close: false,
    worker: {},
    listProduct: [],
    productPage: 0,
    totalProductPage: 0,
    products: [],
    listService: [],
    maintenanceCardDetailStatusHistories: [],
    error: {
        customerError: false,
        repairmanError: false
    },
    payStatus: 0,
    workStatus: 0,
    paymentHistories: [],
    ui: {
        customerModal: false,
        paymentModal: false,
    },
    coordinator: {},
    id: 0,
    price: 0,
    info: {
        code: null,
        platesNumber: null,
        description: null,
        returned: false,
        model: null,
        color: null,
        store: null,
        coupon: null,
        timeLeft: 0,
        workStatus: 0,
        colorBike: {
            id: null,
            modelBike: {
                id: null,
                manufacture: {
                    id: null,
                }
            }
        },
        totalTime: 0,
        returnDateCustomer:null
    },
    checkCustomer: false,
    reset: {
        reset: true,
    },
    suggest: [],
    currentSuggest: 1,
    services: [],
    totalServicePage: 1,
    totalElementService: 1,
    currentServicePage: 1,
    totalService: 0,
    sumMantainanceCard: 0,
    stores: [],
    storesPage: 0,
    storesElements: 0,
    storesCurrentPage: 0,
    coupon: [],
    couponPage: 0,
    couponCurrentPage: 0,
    couponTotalElements: 0,
    totalTimeService: [],
    maintenanceCardDetails: [],
    time: 0,
    manufacture: [],
    manufacturePage: 1,
    manufactureSize: 10,
    modelBike: [],
    colorBike: [],
    minTime: null,
    commentDelete:null,
    categories:[],


};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CreateMaintenanceCardType.SEARCH_CUSTOMER_SUCCESS:
            const {customers} = action.payload.data;
            state.customers = customers
            state.customerPage = 1;
            state.totalCustomerPage = action.payload.data.totalPages;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_LIST_CUSTOMER_SUCCESS:
            const updateCustomers = action.payload.data.customers;
            state.customers = state.customers.concat(updateCustomers)
            state.customerPage = action.payload.data.currentPage;
            state.totalCustomerPage = action.payload.data.totalPages;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_LIST_SERVICE_SUCCESS:
            state.services = action.payload.data.services;
            state.totalServicePage = action.payload.data.totalPages;
            state.currentServicePage = action.payload.data.current;
            state.size = action.payload.data.pageNumber;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_RETURNED:
            console.log(action.payload.data)
            state.info.returned = action.payload.data;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_LIST_SEARCH_REPAIRMAN_SUCCESS:
            const updateRepairmans = action.payload.data.listUser;
            state.listRepairman = state.listRepairman.concat(updateRepairmans)
            state.repairmanPage = state.repairmanPage + 1;
            state.totalRepairman = action.payload.data.total;
            return {...state}
        case CreateMaintenanceCardType.CHOOSE_CUSTOMER:
            let id = action.payload.data;
            let index = findItem(id, state.customers);
            console.log(index);
            state.customerItem = state.customers[index];
            console.log(state);
            return {...state}
        case CreateMaintenanceCardType.CREATE_CUSTOMER:
            return {...state}
        case CreateMaintenanceCardType.CREATE_CUSTOMER_SUCCESS:
            message.success('Thêm khách hàng thành công');
            state.customerItem = action.payload.data
            state.ui = {
                customerModal: false,
            };
            return {...state}
        case CreateMaintenanceCardType.CREATE_CUSTOMER_FAILED:
            console.log(action.payload.e)
            state.ui = {
                customerModal: true,
            };
            message.error(action.payload.e);
            return {...state}
        case CreateMaintenanceCardType.CLEAR_CUSTOMER:
            state.customerItem = {}
            return {...state}
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_INFO:
            const {name, value} = action.payload;
            state.MAINTENANCECard = {
                ...state.MAINTENANCECard,
                [name]: value
            }
            return {...state}
        case CreateMaintenanceCardType.SEARCH_REPAIRMAN_SUCCESS:
            state.listRepairman = action.payload.data.listUser
            state.totalRepairman = action.payload.data.total;
            return {...state}
        case CreateMaintenanceCardType.CHOOSE_REPAIRMAN:
            let idRepairman = action.payload.data;
            state.close = false;
            state.listRepairman.forEach((val) => {
                if (val.user.id == idRepairman) {
                    state.worker = val;
                }
            })
            let indexRepairman = findRepairman(idRepairman, state.listRepairman);
            state.repairman = state.listRepairman[indexRepairman];
            state.repairman.edit = true;
            console.log(state.worker);
            return {...state}
        case CreateMaintenanceCardType.CLEAR_REPAIRMAN:
            state.repairman = {}
            return {...state}
        case CreateMaintenanceCardType.SEARCH_PRODUCT_SUCCESS:
            state.listProduct = action.payload.data.content;
            state.productPage = action.payload.data.number + 1
            state.totalProductPage = action.payload.data.totalPages
            return {...state}
        case CreateMaintenanceCardType.FETCH_PRODUCT_BY_MANUFACTURE_ID_AND_CATEGORIES_ID_SUCCESS:
            state.listProduct = action.payload.data.content;
            state.productPage = action.payload.data.number + 1
            state.totalProductPage = action.payload.data.totalPages
            return {...state}
        case CreateMaintenanceCardType.UPDATE_LIST_PRODUCT_SUCCESS:
            const updateProduct = action.payload.data.content;
            state.listProduct = state.listProduct.concat(updateProduct)
            state.productPage = action.payload.data.number + 1
            state.totalproductPage = action.payload.data.totalPages
            return {...state}
        case CreateMaintenanceCardType.CHOOSE_PRODUCT:
            let idProduct = action.payload.data;
            let indexProduct2 = findItem(idProduct, state.products);
            if (indexProduct2 === -1) {
                let indexProduct = findItem(idProduct, state.listProduct);
                let product = {...state.listProduct[indexProduct]};
                product.key = uuidv4()
                product.status = 0
                product.amount = 1
                product.warranty = 0
                if (product.type === 1) {
                    state.products.push(product);
                } else {
                    state.products.unshift(product);
                }
                let a = [...state.products]
                state.products = a;
            } else {
                if (state.products[indexProduct2].type === 1) {
                    if (state.products[indexProduct2].amount < state.products[indexProduct2].quantity) {
                        state.products[indexProduct2].amount++;
                    } else {
                        message.error(`${state.products[indexProduct2].name} đã tối đa số lượng`)
                    }
                } else {
                    message.warning(`Dịch vụ ${state.products[indexProduct2].name} đã tồn tại`)
                }
            }
            return {...state}
        case CreateMaintenanceCardType.REMOVE_PRODUCT:
            let s = 0;
            let idProductRemove = action.payload.data;
            let indexProductKey = findItem(idProductRemove.toString(), state.products);
            state.products.forEach((val) => {
                if (val.id === idProductRemove) {
                    s = state.sumMantainanceCard - val.pricePerUnit;
                }
            })
            console.log(s);
            state.sumMantainanceCard = s;
            state.products.splice(indexProductKey, 1);
            let a1 = [...state.products]
            state.products = a1;
            return {...state}
        case CreateMaintenanceCardType.REMOVE_SERVICE:
            let s1 = 0;
            let keyRemove = action.payload.data;
            let a = [];
            let indexkeyRemove = findItem(keyRemove.toString(), state.listService);
            state.listService.forEach((val) => {
                console.log(val);
                if (val.id === keyRemove) {
                    s1 = state.sumMantainanceCard - val.price;
                    a = findIndexTotalTimeService(val.time, state.totalTimeService);

                }
            })
            console.log(a);
            state.totalTimeService = a;
            state.sumMantainanceCard = s1;
            state.listService.splice(indexkeyRemove, 1);
            console.log(state.listService);
            let m1 = [...state.listService];
            state.listService = m1;
            return {...state}
        case CreateMaintenanceCardType.CHOOSE_SERVICE:
            let idService = action.payload.data;
            let indexService = findService(idService, state.listService);

            if (indexService != -1) {
                console.log('refuse');
                message.warning(`Dịch vụ  đã tồn tại`);
            } else {

                console.log('aggree');
                state.listService.push(idService);
                console.log(state.listService);
                let a = [...state.listService]
                state.listService = a;
                let total = sumService(state.listService);
                state.totalService = total;
                if (indexService == -1) {
                    state.sumMantainanceCard = state.sumMantainanceCard + (idService.price);
                }

            }


            return {...state}
        case CreateMaintenanceCardType.SUM_MAINTENANCE_CARD:

            let data = action.payload.data;
            let val = state.sumMantainanceCard;
            state.sumMantainanceCard = (val + data);
            return {...state}
        case CreateMaintenanceCardType.REMOVE_SERVICE:
            let idServiceRemove = action.payload.data;
            let indexServiceKey = findItem(idServiceRemove.toString(), state.listService);
            state.listService.splice(indexServiceKey, 1);
            let svs = [...state.listService];
            state.listService = svs;
            return {...state}
        case CreateMaintenanceCardType.CHANGE_AMOUNT:
            let idProduct1 = action.payload.id;
            let indexProduct1 = findItem(idProduct1.toString(), state.products);
            console.log(state.products[indexProduct1].quantity);
            console.log(action.payload.value);
            if (state.products[indexProduct1].quantity >= action.payload.value) {
                state.products[indexProduct1].amount = action.payload.value;
            } else {
                state.products[indexProduct1].amount = state.products[indexProduct1].quantity
                message.error(`${state.products[indexProduct1].name} còn lại ${state.products[indexProduct1].quantity} sản phẩm`)
            }
            let a2 = [...state.products]
            state.products = a2;
            return {...state}
        case CreateMaintenanceCardType.ERROR:

            state.error.customerError = false;
            state.error.repairmanError = false;
            for (let i = 0; i < action.payload.data.length; i++) {
                console.log(action.payload.data[i]);
                state.error[action.payload.data[i]] = true
            }
            console.log(state.error);
            state.reset = false;
            let a3 = {...state.error};
            state.error = a3
            if (state.error.repairmanError) {
                message.warning("Vui lòng thêm chọn nhân viên sửa chữa");
            } else if (state.error.customerError) {
                message.warning("Vui lòng chọn khách hàng");
            } else {
                message.warning("Vui lòng nhập đẩy đủ thông tin")
            }

            return {...state}
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_SUCCESS:
            let key = action.payload.data.id;
            message.loading({content: 'Loading...', key});
            setTimeout(() => {
                message.success({content: "Tạo phiếu sửa chữa thành công", key, duration: 2})
            }, 1500)
            state.id = action.payload.data.id;
            state.close = true;
            state.check = false;
            return {...state}
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.message)
            return {...state}
        case CreateMaintenanceCardType.WARRANTY_PRODUCT:
            const idProductWarranty = action.payload.data;
            const indexProductWarranty = findItem(idProductWarranty.toString(), state.products);
            if (state.products[indexProductWarranty].warranty === 1) {
                state.products[indexProductWarranty].warranty = 0;
            } else {
                state.products[indexProductWarranty].warranty = 1
            }
            return {...state}
        case CreateMaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_ID_SUCCESS:
            console.log(action.payload.data);
            let len = 0;
            state.returnDate = action.payload.data.returnDate;
            state.check = true;
            state.returnDateCustomer = action.payload.data.returnDateCustomer;
            state.customerItem = action.payload.data.customer;
            state.products = [];
            state.listService = [];
            state.info.store = action.payload.data.store;
            state.info.coupon = action.payload.data.coupon;
            state.info.returned = action.payload.data.returned;
            state.payStatus = action.payload.data.payStatus;
            state.info.colorBike = action.payload.data.colorBike;
            state.info.totalTime = action.payload.data.totalTime;
            state.info.returnDateCustomer = action.payload.data.returnDateCustomer;

            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                if (maintenanceCardDetail.product != null) {
                    len++;
                }

            }
            //if product.length > service.length
            // if (len === action.payload.data.maintenanceCardDetails.length) {
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                if (product != null && product != undefined) {
                    product.maintenanceCardDetailId = maintenanceCardDetail.id;
                    product.amount = maintenanceCardDetail.quantity
                    if (maintenanceCardDetail.price === 0) {
                        product.warranty = 1;
                    } else {
                        product.warranty = 0;
                    }
                    product.status = maintenanceCardDetail.status
                    product.key = uuidv4()
                    state.products.push(product)
                }
            }

            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];

                if (maintenanceCardDetail.service != null) {
                    let sv = maintenanceCardDetail.service;
                    let index000 = findServiceByMaintenanceById(maintenanceCardDetail.service.id, state.listService);
                    if (index000 === -1) {
                        sv.maintenanceCardDetailId = maintenanceCardDetail.id;
                        sv.workStatus = maintenanceCardDetail.status;
                        sv.free = maintenanceCardDetail.free;
                        state.listService.push(sv);

                    }
                }
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.workStatus = action.payload.data.workStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;

            if (action.payload.data.repairman !== null) {
                state.repairman.user = action.payload.data.repairman;
                state.repairman.edit = false
                state.worker = action.payload.data.repairman;
            }

            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.sumMantainanceCard = action.payload.data.price;
            state.time = action.payload.data.totalTime;
            state.checkCustomer = false;
            return {...state}
        case CreateMaintenanceCardType.RESET_STORE:
            let newState = {
                customers: [],
                customerPage: 0,
                totalCustomerPage: 0,
                customerItem: {},
                listRepairman: [],
                repairmanPage: 1,
                totalRepairman: 0,
                repairman: {
                    user: {},
                    edit: true
                },
                close: false,
                worker: {},
                listProduct: [],
                productPage: 0,
                totalProductPage: 0,
                products: [],
                error: {
                    customerError: false,
                    repairmanError: false
                },
                payStatus: 0,
                workStatus: 0,
                paymentHistories: [],
                ui: {
                    customerModal: false
                },
                coordinator: {},
                id: 0,
                info: {
                    code: null,
                    platesNumber: null,
                    description: null,
                    returnDate: null,
                    model: null,
                    color: null,
                    store: {},
                    coupon: {},
                    colorBike: {
                        id: null,
                        modelBike: {
                            id: null,
                            manufacture: {
                                id: null,
                            }
                        }
                    },
                    totalTime: 0,
                    returnDateCustomer:null
                },
                reset: true,
                listService: [],
                services: [],
                totalService: 0,
                sumMantainanceCard: 0,
                stores: [],
                storesPage: 0,
                storesElements: 0,
                stores: [],
                storesPage: 0,
                storesElements: 0,
                storesCurrentPage: 0,
                coupon: [],
                couponPage: 0,
                couponCurrentPage: 0,
                couponTotalElements: 0,
                totalTimeService: [],
                manufacture: [],
                manufacturePage: 1,
                manufactureSize: 10,
                modelBike: [],
                colorBike: [],
                minTime: null,
                commentDelete:null,
                categories:[],

            }
            if (state.checkCustomer) {
                newState.customerItem = state.customerItem;
            }
            return {...newState}
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_SUCCESS:
            message.success("Cập nhật phiếu sửa chữa thành công")

            state.check = true;
            state.customerItem = action.payload.data.customer

            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                } else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info = {
                code: action.payload.data.code,
                platesNumber: action.payload.data.platesNumber,
                description: action.payload.data.description,
                returnDate: action.payload.data.returnDate,
                model: action.payload.data.model,
                color: action.payload.data.color,
                colorBike: action.payload.data.colorBike
            }

            if (action.payload.data.repairman !== null) {

                state.repairman.user = action.payload.data.repairman;
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.checkCustomer = false;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.message)
            return {...state}
        case CreateMaintenanceCardType.COMPLETE_CARD_SUCCESS:
            let b2 = {...state.reset};
            state.reset = b2;
            message.success("Thay đổi trạng thái thành công")
            return {...state}
        case CreateMaintenanceCardType.UPDATE_STATUS_DETAIL_SUCCESS:
            console.log(action.payload.data);
            message.success("Cập nhật trạng thái thành công")
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                } else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus;

            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;

            if (action.payload.data.repairman !== null) {
                state.repairman.user = action.payload.data.repairman;
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.checkCustomer = false;
            return {...state}
        case CreateMaintenanceCardType.UPDATE_STATUS_DETAIL_FAILED:
            message.error(action.payload.message);
            return {...state}
        case CreateMaintenanceCardType.CREATE_PAYMENT_HISTORY_SUCCESS:
            message.success("Thanh toán thành công")
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                } else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;

            if (action.payload.data.repairman !== null) {
                state.repairman.user = action.payload.data.repairman;
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.ui = {
                customerModal: false,
                paymentModal: false,
            }
            state.checkCustomer = false;
            return {...state}
        case CreateMaintenanceCardType.CREATE_PAYMENT_HISTORY_FAILED:
            message.error("Số tiền thoanh toán không được vượt quá số tiền trả")
            return {...state}
        case CreateMaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_ID_FAILED:
            message.error("Không tìm thấy phiếu sửa chữa")
            return {...state}
        case CreateMaintenanceCardType.DELETE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.data)
            return {...state}
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_WITH_CUSTOMER:
            state.customerItem = action.payload.data;
            state.checkCustomer = true;
            return {...state}
        case CreateMaintenanceCardType.FETCH_SUGGEST_REPAIRMAN_SUCCESS:

            state.suggest = action.payload.data.repairs;
            state.currentSuggest = action.payload.data.currentPage;
            return {...state}
        case CreateMaintenanceCardType.SEARCH_SERVICE_SUCCESS:

            state.services = action.payload.data.services;
            state.totalServicePage = action.payload.data.totalPages;
            state.totalElementService = action.payload.data.totalElements
            state.currentServicePage = action.payload.data.currentPage;

            return {...state}
        case CreateMaintenanceCardType.UPDATE_LIST_SERVICE_SUCCESS:
            //  state.listProduct = a
            return {...state}
        case CreateMaintenanceCardType.FETCH_STORE_SUCCESS:
            // console.log(action.payload.data);
            state.stores = action.payload.data.stores;
            state.storesCurrentPage = action.payload.data.currentPage;
            state.storesElements = action.payload.data.totalElements;
            state.storesPage = action.payload.data.totalPages;
            return {...state}
        case CreateMaintenanceCardType.FETCH_COUPON_SUCCESS:
            // console.log(action.payload.data);
            state.coupon = action.payload.data.coupons;
            state.couponCurrentPage = action.payload.data.currentPage;
            state.couponTotalElements = action.payload.data.totalElements;
            state.couponPage = action.payload.data.totalPages;
            return {...state}
        case CreateMaintenanceCardType.CALCULATE_TIMESERVICE:
            let v = action.payload.data;
            state.totalTimeService.push(v);
            return {...state}
        case CreateMaintenanceCardType.FECTCH_MANUFUCTURE_SUCCESS:
            state.manufacture = action.payload.data.manufacturer;
            state.manufacturePage = action.payload.data.currentPage;
            state.manufactureSize = action.payload.data.totalPages;
            return {...state}
        case CreateMaintenanceCardType.FECTCH_MODEL_BIKE_SUCCESS:
            console.log(action.payload.data);
            state.modelBike = action.payload.data;
            return {...state}
        case CreateMaintenanceCardType.FETCH_COLOR_BIKE_SUCCESS:
            console.log(action.payload.data);
            state.colorBike = action.payload.data;
            return {...state}
        case CreateMaintenanceCardType.MIN_TIME_LEFT_REPAIRMAN_SUCCESS:
            state.minTime = action.payload.data;
            return {...state}
        case CreateMaintenanceCardType.COMMENT_DELETE:
            state.commentDelete = action.payload.data;
            return {...state}
        case CreateMaintenanceCardType.FETCH_CATEGORY_SUCCESS:
            state.categories = action.payload.data.content;
            return  {...state};
        default:
            return {...state}
    }
}

const findItem = (id, list) => {
    let index = -1;

    for (let i = 0; i < list.length; i++) {
        if (list[i].id.toString() === id) {
            index = i;
            break;
        }
    }
    return index;
}

const findMaintenanceCardDetail = (id, list) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].maintenanceCardDetailId.toString() === id.toString()) {
            index = i;
            break;
        }
    }
    return index;
}
const findService = (id, list) => {
    let index11 = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id.id) {
            return i;
        }
    }
    return index11;
}
const findRepairman = (id, list) => {
    console.log(list);
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].user.id.toString() === id) {

            index = i;
            break;
        }
    }
    return index;
}
const sumService = (list) => {
    let total = 0;
    list.forEach(element => {
        total += element.price;
    });

    return total;
}
const findServiceByMaintenanceById = (id, list) => {
    let index11 = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            index11 = i;
            break;
        }


    }
    return index11;
}
const findServiceById = (id, list) => {
    list.forEach((val) => {
        if (val.id == id) {
            return val;
        }
    })
    return null;
}
const findIndexTotalTimeService = (value, list) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i] == value) {
            index = i;
            break;
        }

    }
    if (index != -1) {
        list.splice(index, 1);
    }
    return list;
}
export default reducer;
