
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Service from '../../../components/MaintenanceCardAdd/Services'

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
const ServiceContainer = (props) => {
//   console.log(props);
    return (
        <Service maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
            maintenanceCardAdd={props.maintenanceCardAdd}
            totalPage = {props.totalServicePage}
            services = {props.services}
            totalElement = {props.totalElement}
            currentPage= {props.currentPage} 
            listService={props.listService}
            totalService={props.totalService}
            sumMantainanceCard={props.sumMantainanceCard}
            user = {props.user} />

    );
}

const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
        services: state.maintenanceCardAdd.services,
        totalPage: state.maintenanceCardAdd.totalServicePage,
        totalElement:state.maintenanceCardAdd.totalElementService,
        currentPage:state.maintenanceCardAdd.currentServicePage,
        listService:state.maintenanceCardAdd.listService,
        totalService:state.maintenanceCardAdd.totalService,
        sumMantainanceCard:state.maintenanceCardAdd.sumMantainanceCard,
        user: state.userReducer,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);