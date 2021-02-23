import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Store from "../../pages/Store/StoreList"
import * as storeActions from '../../actions/store';

const StoreContainer = (props) => {
    return (
        <Store storeActionsCreator={props.storeActionsCreator}
            createStore={props.createStore} />
    );
}

const mapStateToProps = (state) => {
    return {
        createStore: state.createStore,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeActionsCreator: bindActionCreators(storeActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreContainer);
