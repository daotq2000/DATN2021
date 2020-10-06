import React from 'react';
import MaintenanceCardAdd from './pages/MaintenanceCards/MaintenanceCardAdd';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccessoriesList from './pages/Accessories/AccessoriesList';
import TestTable from './pages/TemplateQL';
import ListCustomer from './pages/Customer/ListCustomer';
import CustomerInfo from './pages/Customer/CustomerInfo';
import AddCustomer from './pages/Customer/AddCustomer';
import WarrantyCard from './pages/MaintenanceCards';
import WarrantyCardInfo from './pages/MaintenanceCards/MaintenanceCardEditNVDP';
import CreateAccessory from './pages/Accessories/CreateAccessory';
import WarrantyCardEdit from './pages/MaintenanceCards/WarrantyCardEdit';
import WarrantyCardEditNVSC from './pages/MaintenanceCards/WarrantyCardEditNVSC';
import WarrantyCardEditNVQL from './pages/MaintenanceCards/WarrantyCardEditNVQL';
import UpdateCustomer from './pages/Customer/UpdateCustomer';
import UpdateAccessory from './pages/Accessories/UpdateAccessory';
import Overview from './pages/Report/Overview';
import EmployeeFormUpdate from './pages/Employee/EmployeeFormUpdate';
import EmployeeInfo from './pages/Employee/EmployeeInfo';
import EmployeeFormInsert from './pages/Employee/EmployeeFormInsert';
import EmployeeList from './pages/Employee/EmployeeList';
import ServicesList from './pages/Services/ServicesList';
import UpdateService from './pages/Services/UpdateService';
import CreateService from './pages/Services/CreateService';
import Login from "./pages/Login/index"
const routes = [
    {
        to: '/',
        exact: true,
        main: () => <Home />
    },
    {
        to: '/test',
        exact: true,
        main: () => <TestTable />
    },
    {
        to: '/maintenanceCards/create',
        exact: true,
        main: () => <MaintenanceCardAdd />
    },
    {
        to: '',
        exact: true,
        main: () => <NotFound />
    },

    {
        to: '/accessories',
        exact: true,
        main: () => <AccessoriesList />
    },
    {
        to: '/accessories/create',
        exact: true,
        main: () => <CreateAccessory />
    },
    {
        to: '/customers',
        exact: true,
        main: () => <ListCustomer />
    },
    {
        to: '/customers/:id/histories',
        exact: true,
        main: ({ match }) => <CustomerInfo match={match} />
    },
    {
        to: '/customers/create',
        exact: true,
        main: ({ match }) => <AddCustomer match={match} />
    },
    {
        to: '/customers/update/:id',
        exact: true,
        main: ({match}) => <UpdateCustomer match={match}/>
    },
    {
        to: '/maintenanceCards',
        exact: true,
        main: () => <WarrantyCard />
    },
    {
        to: '/maintenanceCards/:id',
        exact: true,
        main: ({match}) => <WarrantyCardInfo match={match} />
    },
    {
        to: '/accessories/detail/:id',
        exact: true,
        main: () => <UpdateAccessory />
    },
    {
        to: '/maintenanceCards/edit/:id',
        exact: true,
        main: () => <WarrantyCardEdit />
    },
    {
        to: '/maintenanceCards/editnvsc/:id',
        exact: true,
        main: () => <WarrantyCardEditNVSC />
    },
    {
        to: '/maintenanceCards/editnvql/:id',
        exact: true,
        main: () => <WarrantyCardEditNVQL />
    },
    {
        to: '/analytics/dashboard',
        exact: true,
        main: () => <Overview />
    },
    {
        to: '/employee/update/:id',
        exact: true,
        main: () => <EmployeeFormUpdate />
    },
    {
        to: '/employee/:id',
        exact: true,
        main: () => <EmployeeInfo />
    },
    {
        to: '/employees',
        exact: true,
        main: () => <EmployeeList />
    },
    {
        to: '/employees/add',
        exact: true,
        main: () => <EmployeeFormInsert />
    },
    {
        to: '/services',
        exact: true,
        main: () => <ServicesList />
    },
    {
        to: '/services/detail/:id',
        exact: true,
        main: () => <UpdateService />
    },
    {
        to: '/services/create',
        exact: true,
        main: () => <CreateService />
    }
]

export default routes;