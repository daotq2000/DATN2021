
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Customer from '../../../components/MaintenanceCardAdd/Customer'

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd';

const CustomerContainer = (props) => {
    return (
        <Customer maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
            maintenanceCardAdd={props.maintenanceCardAdd}
            close = {props.close} />
    );
};

const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);