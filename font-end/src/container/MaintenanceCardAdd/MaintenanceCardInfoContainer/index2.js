
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Info from '../../../pages/MaintenanceCards/MaintenanceCardEditNVDP/info';

import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
const Info2 = (props) => {
    return (
        <Info maintenanceCardAddActionCreators={props.maintenanceCardAddActionCreators}
                             maintenanceCardAdd={props.maintenanceCardAdd}
                             user={props.user}
                             idParam={props.idParam}
                             refeshInfo = {props.refesh} />
    );
}

const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
        user: state.userReducer,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info2);