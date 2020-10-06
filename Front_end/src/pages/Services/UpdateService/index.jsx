import { LeftOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ServiceForm from '../../../components/ServiceForm';
import * as getServiceAction from '../../../actions/service';
import * as updateServiceAction from '../../../actions/updateService';
import { connect } from 'react-redux';

const UpdateService = (props) => {
    const { id } = useParams("id");
    const [rendering, setRendering] = useState(0);
    const [product, setProduct] = useState({
        name: "",
        pricePerUnit: 0,
        description: ""
    });
    const { actionGetService } = props.productActionCreator;
    const { productUpdateActionCreator } = props;
    useEffect(() => {
        actionGetService(id);
    }, [actionGetService]);
    useEffect(() => {
        setProduct(props.service);
    }, [props.service]);
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/services'><LeftOutlined /> Danh sách dịch vụ</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thông tin dịch vụ
                </span>
                <ServiceForm id={id} product={product} productUpdateActionCreator={productUpdateActionCreator} />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return { service: state.serviceReducer };
}

const mapDispatchToProps = (dispatch) => {
    return {
        productActionCreator: bindActionCreators(getServiceAction, dispatch),
        productUpdateActionCreator: bindActionCreators(updateServiceAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateService);