import {combineReducers} from 'redux';
import customerReducer from './customer';
import addressReducer from './address';
import maintenanceCardAdd from './MaintenanceCardAdd';
import accessoriesReducer from './accessories';
 
import userReducer from './user'
import employeeReducer from './employee'
// import supplierReducer from './supplier'
import accessoryReducer from './accessory';
import maintenanceCard from './MaintenanceCard'
import serviceReducer from './service';
import statisticReducer from './statistic';
import paymentReducer from './paymentHistories';
import productsReducer from './products';
import productReducer from './product';
import storeReducer from './store';
import couponReducer from './coupon';
import manufacturerReducer from './Manufacturer';
import categoryReducer from './category';
import modelBikeReducer from './ModekBike';
import colorBikeReducer from './colorBiker';

const appReducer = combineReducers({
    customerReducer,
    maintenanceCardAdd,
    accessoriesReducer,
    accessoryReducer,
    manufacturerReducer,
    categoryReducer,
    modelBikeReducer,
    serviceReducer,
    productsReducer,
    productReducer,
    addressReducer,
    employeeReducer,
    // supplierReducer,
    userReducer,
    colorBikeReducer,
    maintenanceCard,
    statisticReducer,
    paymentReducer,
    storeReducer,
    couponReducer,
})

export default appReducer;