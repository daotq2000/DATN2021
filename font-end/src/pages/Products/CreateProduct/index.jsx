import { LeftOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as createAccessoryAction from '../../../actions/createAccessory';
import * as productsAction from '../../../actions/products';
// import * as createServiceAction from '../../../actions/createService';
import AccessoryForm from '../../../components/AccessoryForm';
import ServiceForm from '../../../components/ServiceForm';
import PropTypes from "prop-types";

const CreateProduct = (props) => {

    const [showData, setShowData] = useState("1");
    const { Option } = Select;
    const handleShowDataChange = (value) => {
        setShowData(value);
    }


    const renderForm = () => {
        switch (showData) {
            case "1":
                return <AccessoryForm product={{}}  createAccessoryActionCreator={props.createAccessoryActionCreator} />
            case "2":
                return <ServiceForm product={{}} createServiceActionCreator={props.createServiceActionCreator} />
        }
    }
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/products'><LeftOutlined /> Danh sách sản phẩm</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thêm sản phẩm
                </span>

                {renderForm()}
            </div>
        </>
    );
}
CreateProduct.propTypes = {
    createAccessoryActionCreator: PropTypes.shape({
        createAccessoryActionCreator: PropTypes.func,
    })
}
const mapStateToProps = state => {
    return {
       states:state.productsReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createAccessoryActionCreator: bindActionCreators(createAccessoryAction, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);