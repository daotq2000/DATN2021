import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Service from "../../pages/Service/ServiceList"
import * as serviceActions from '../../actions/service';

const ServiceContainer = (props) => {
    return (
        <Service serviceActionsCreator={props.serviceActionsCreator}
            createService={props.createService} />
    );
}

const mapStateToProps = (state) => {
    return {
        createService: state.createService,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        serviceActionsCreator: bindActionCreators(serviceActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);
