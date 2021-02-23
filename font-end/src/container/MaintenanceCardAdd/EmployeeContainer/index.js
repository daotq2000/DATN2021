import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Employee from '../../../components/MaintenanceCardAdd/Employee'

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd';
const EmployeeContainer = (props) => {
     
    return (
        <Employee maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
            maintenanceCardAdd={props.maintenanceCardAdd}
            suggest={props.suggest}
            currentPage = {props.currentSuggest}
            repairManItem = {props.repairManItem}
              />
    );
};

const mapStateToProps = (state) => {
    
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
        suggest: state.maintenanceCardAdd.suggest,
        currentPage: state.maintenanceCardAdd.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);