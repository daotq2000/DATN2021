import React from 'react';
import MaintenanceCardAdd from './pages/MaintenanceCards/MaintenanceCardAdd';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccessoriesList from './pages/Accessories/AccessoriesList';
import ListCustomer from './pages/Customer/ListCustomer';
import CustomerInfo from './pages/Customer/CustomerInfo';
import AddCustomer from './pages/Customer/AddCustomer';
import MaintenanceCards from './pages/MaintenanceCards';
import WarrantyCardInfo from './pages/MaintenanceCards/MaintenanceCardEditNVDP';
import CreateAccessory from './pages/Accessories/CreateAccessory';
import UpdateCustomer from './pages/Customer/UpdateCustomer';
import UpdateAccessory from './pages/Accessories/UpdateAccessory';
import Overview from './pages/Report/Overview';
import EmployeeFormUpdate from './pages/Employee/EmployeeFormUpdate';
import EmployeeInfo from './pages/Employee/EmployeeInfo';
import EmployeeFormInsert from './pages/Employee/EmployeeFormInsert';
import EmployeeList from './pages/Employee/EmployeeList';

import Login from "./pages/Login/index"
import ProductsList from './pages/Products/ProductsList';
import CreateProduct from './pages/Products/CreateProduct';
import UpdateProduct from './pages/Products/UpdateProduct';


import StoreFormUpdate from './pages/Store/StoreFormUpdate';
import StoreInfo from './pages/Store/StoreInfo';
import StoreFormInsert from './pages/Store/StoreFormInsert';
import StoreList from './pages/Store/StoreList';
import ServiceFormUpdate from './pages/Service/ServiceFormUpdate';
import ServiceInfo from './pages/Service/ServiceInfo';
import ServiceFormInsert from './pages/Service/ServiceFormInsert';
import ServiceList from './pages/Service/ServiceList';
import CouponFormUpdate from './pages/Coupon/CouponFormUpdate';
import CouponInfo from './pages/Coupon/CouponInfo';
import CouponFormInsert from './pages/Coupon/CouponFormInsert';
import CouponList from './pages/Coupon/CouponList';
import ModelBikeList from './pages/ModelBike/ModelBikeList'; 
import ModelBikeTable from './pages/ModelBike/ModelBikeTable'; 
import ModelBikeUpdate from './pages/ModelBike/ModelBikeUpdate';
import ModelbikeFormInsert from './pages/ModelBike/ModelbikeFormInsert';
import ManufacturerList from './pages/Manufacturer/ManufacturerList';
import ManufacturerFromInsert from './pages/Manufacturer/ManufacturerFromInsert';
import ManufacturerFromUpdate from './pages/Manufacturer/ManufacturerFromUpdate';
import ColorBikerList from './pages/Colorbike/ColorBikerList';
import ColorBikeInfo from './pages/Colorbike/ColorBikeInfo';
import ColorBikerUpdate from './pages/Colorbike/ColorBikerUpdate';
import ColorIndert from './pages/Colorbike/ColorIndert';
import CategoryList from './pages/Category/CategoryList';
import CategoryFromInsert from './pages/Category/CategoryFromInsert';
import CategoryFromUpdate from './pages/Category/CategoryFromUpdate';

const routes = [
    {
        to: '/',
        exact: true,
        main: () => <Home />,
        role: [1,2,3]
    },
    {
        to: '/stores/update/:id',
        exact: true,
        main: () => <StoreFormUpdate />,
        role: [1,2,3]
    },
    {
        to: '/stores/create',
        exact: true,
        main: () => <StoreFormInsert />,
        role: [1,3,2]
    },
    {
        to: '/stores/:id(\\d+)',
        exact: true,
        main: ({match}) => <StoreInfo match={match} />,
        role: [3,1,2]
    },
    {
        to: '/stores',
        exact: true,
        main: () => <StoreList />,
        role: [3,1,2]
    },
    {
        to: '/services/update/:id',
        exact: true,
        main: match => <ServiceFormUpdate match={match}/>,
        role: [1,2,3]
    },
    {
        to: '/services/create',
        exact: true,
        main: () => <ServiceFormInsert />,
        role: [1,3,2]
    },
    {
        to: '/services/:id(\\d+)',
        exact: true,
        main: ({match}) => <ServiceInfo match={match} />,
        role: [3,1,2]
    },
    {
        to: '/services',
        exact: true,
        main: () => <ServiceList />,
        role: [3,1,2]
    },
    {
        to: '/coupons/update/:id',
        exact: true,
        main: () => <CouponFormUpdate />,
        role: [1,2,3]
    },
    {
        to: '/coupons/create',
        exact: true,
        main: () => <CouponFormInsert />,
        role: [1,3,2]
    },
    {
        to: '/coupons/:id(\\d+)',
        exact: true,
        main: ({match}) => <CouponInfo match={match} />,
        role: [3,1,2]
    },
    {
        to: '/coupons',
        exact: true,
        main: () => <CouponList />,
        role: [3,1,2]
    },
    {
        to: '/accessories',
        exact: true,
        main: () => <AccessoriesList />,
        role: [3]
    },
    {
        to: '/accessories/create',
        exact: true,
        main: () => <CreateAccessory />,
        role: [3]
    },
    {
        to: '/customers',
        exact: true,
        main: () => <ListCustomer />,
        role: [1,3]
    },
    {
        to: '/customers/create',
        exact: true,
        main: ({ match }) => <AddCustomer match={match} />,
        role: [1,3]
    },
    {
        to: '/customers/:id(\\d+)',
        exact: true,
        main: ({ match }) => <CustomerInfo match={match} />,
        role: [1,3]
    },
    {
        to: '/customers/update/:id',
        exact: true,
        main: ({match}) => <UpdateCustomer match={match}/>,
        role: [1,3]
    },
    {
        to: '/maintenanceCards',
        exact: true,
        main: () => <MaintenanceCards />,
        role: [1,2,3]
    },
    {
        to: '/maintenanceCards/create',
        exact: true,
        main: () => <MaintenanceCardAdd />,
        role: [1,3]
    },
    {
        to: '/maintenanceCards/:id(\\d+)',
        exact: true,
        main: ({match}) => <WarrantyCardInfo match={match} />,
        role: [1,2,3]
    },
    {
        to: '/accessories/detail/:id',
        exact: true,
        main: () => <UpdateAccessory />,
        role: [3]
    },
    {
        to: '/analytics/dashboard',
        exact: true,
        main: () => <Overview />,
        role: [3]
    },
    {
        to: '/employees/update/:id',
        exact: true,
        main: () => <EmployeeFormUpdate />,
        role: [3]
    },
    {
        to: '/employees/create',
        exact: true,
        main: () => <EmployeeFormInsert />,
        role: [3]
    },
    {
        to: '/employees/:id(\\d+)',
        exact: true,
        main: ({match}) => <EmployeeInfo match={match} />,
        role: [3]
    },
    {
        to: '/employees',
        exact: true,
        main: () => <EmployeeList />,
        role: [3]
    },
    {
        to: '/category',
        exact: true,
        main: () => <CategoryList />,
        role: [3]
    },
    {
        to: '/category/create',
        exact: true,
        main: () => <CategoryFromInsert />,
        role: [3]
    },
    {
        to: '/category/update/:id',
        exact: true,
        main: () => <CategoryFromUpdate />,
        role: [3]
    },
    {
        to: '/manufacturer',
        exact: true,
        main: () => <ManufacturerList />,
        role: [3]
    },
   
    {
        to: '/manufacturer/create',
        exact: true,
        main: () => <ManufacturerFromInsert />,
        role: [3]
    },
    {
        to: '/manufacturer/update/:id',
        exact: true,
        main: () => <ManufacturerFromUpdate />,
        role: [3]
    },
    {
        to: '/colorbike',
        exact: true,
        main: () => <ColorBikerList />,
        role: [3]
    },
    {
        to: '/colorbike/create',
        exact: true,
        main: () => <ColorIndert />,
        role: [3]
    },
    {
        to: '/colorbike/update/:id',
        exact: true,
        main: () => <ColorBikerUpdate />,
        role: [3]
    },
    {
        to: '/colorbike/:id(\\d+)',
        exact: true,
        main: ({match}) => <ColorBikeInfo match={match} />,
        role: [3]
    },   
    {
        to: '/modelbike',
        exact: true,
        main: () => <ModelBikeList />,
        role: [3]
    },
    {
        to: '/modelbike/create',
        exact: true,
        main: () => <ModelbikeFormInsert />,
        role: [3]
    },
    // {
    //     to: '/modelbike/create',
    //     exact: true,
    //     main: () => <ModelBikeTable />,
    //     role: [3]
    // },
    
    {
        to: '/modelbike/update/:id',
        exact: true,
        main: () => <ModelBikeUpdate />,
        role: [3]
    },
   
    // {
    //     to: '/services',
    //     exact: true,
    //     main: () => <ServicesList />,
    //     role: [3]
    // },
    // {
    //     to: '/services/detail/:id',
    //     exact: true,
    //     main: () => <UpdateService />,
    //     role: [3]
    // },
    // {
    //     to: '/services/create',
    //     exact: true,
    //     main: () => <CreateService />,
    //     role: [3]
    // },
    {
        to: '/products',
        exact: true,
        main: () => <ProductsList />,
        role: [3]
    },
    {
        to: '/products/create',
        exact: true,
        main: () => <CreateProduct />,
        role: [3]
    },
    {
        to: '/product/:id(\\d+)',
        exact: true,
        main: () => <UpdateProduct />,
        role: [3]
    },
    {
        to: '*',
        exact: true,
        main: () => <NotFound />,
        role: [1,2,3]
    }
    
]

export default routes;
