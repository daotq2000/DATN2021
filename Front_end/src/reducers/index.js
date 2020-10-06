import {combineReducers} from 'redux';
import customerReducer from './customer';
import addressReducer from './address';
import maintenanceCardAdd from './MaintenanceCardAdd';
import accessoriesReducer from './accessories';
import servicesReducer from './services';
import userReducer from './user'
import employeeReducer from './employee'
import accessoryReducer from './accessory';
import maintenanceCard from './MaintenanceCard'
import serviceReducer from './service'
const appReducer = combineReducers({
    customerReducer,
    maintenanceCardAdd,
    accessoriesReducer,
    accessoryReducer,
    servicesReducer,
    serviceReducer,
    addressReducer,
    employeeReducer,
    userReducer,
    maintenanceCard,
})

export default appReducer;