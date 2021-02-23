import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as storeActions from '../../actions/store';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Modal } from 'antd';
const { Option } = Select;



const StoreFormUpdate = (props) => {
 

    const [state, setState] = useState({
        visible: false,
        id: null,
        code: null,
        name: null,
        phone: null,
        address: null,
        description: null,
        status: 1,
    });

    const showModal = () => {
        setState({
            visible: true,
        });
    };

    const handleOk = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };


    let idStore = useParams().id;
    const { storeActionsCreator } = props;
    const { actUpdateStore } = storeActionsCreator;

    const { storeItem } = props;
    const { actGetItemStore } = storeActionsCreator;

    const onFinish = (values) => {
       
            actUpdateStore(idStore,values);
        
    };

    useEffect(() => {
      
    })

    const onFinishFailed = (errorInfo) => {

        console.log('Failed:', errorInfo);
    };

    function onChange(value) {
        console.log(`selected ${value}`);
    }
    const { id, code, name, phone, address, description, status } = storeItem;

    useEffect(() => {
        if (idStore != undefined || idStore != null) {
            actGetItemStore(idStore);

        }
    }, [])

    return (
        <>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                name="basic"

                fields={
                    [
                        {
                            name: 'id',
                            value: id
                        },
                        {
                            name: "name",
                            value: name
                        },
                        {
                            name: 'code'
                            , value: code === undefined ? "":code.toUpperCase() 
                        },
                        {
                            name: 'phone',
                            value: phone
                        },
                        {
                            name: 'address',
                            value: address
                        },
                        {
                            name: 'description',
                            value: description
                        },                      
                        {
                            name: 'status',
                            value: status
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16, marginTop: -30 }}>
                        <p>
                            <NavLink to="/admin/stores"><LeftOutlined />Danh sách cửa hàng</NavLink>
                        </p>
                

                    </div>

                    <div className='storeInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Sửa thông tin cửa hàng' style={{ marginBottom: 16,  width: '1000px', marginLeft: '150px' }}>

                                        <Col span={12} style={{width:'98%'}}>

                                            <Form.Item
                                                style={{ width: '100%' }}
                                                label='Tên nhà cửa hàng'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên cửa hàng" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item
                                                    style={{ width: '100%' }}
                                                    label='Số điện thoại'
                                                    name="phone"
                                                    validateTrigger={["onBlur"]}
                                                    rules={
                                                        [
                                                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                            {
                                                                pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                                max: 10,
                                                                message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <Input name="phone" placeholder="Nhập số điện thoại" />
                                                </Form.Item>
                                            </Col>
                                        <Row>

                                            <Col span={12}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="address"
                                                >
                                                    <Input name="address" placeholder="Nhập địa chỉ nhà cung cấp" />
                                                </Form.Item>
                                            </Col>
                                            </Row>
                                            <Row>
                                            <Col span={24} style={{width: '100%'}} >
                                                <Form.Item
                                                
                                                    label='Mô tả'
                                                   name="description"                                                  
                                                >
                                                    <textarea rows="3" name="description" placeholder="Nhập thông tin" style={{width:'100%'}}></textarea>
                                                </Form.Item>
                                            </Col>
                                            </Row>
                                            <Col span={24}>
                                            <Form.Item 
                                            name="status"
                                            >
                                                <Input hidden/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item 
                                                    name="code"

                                                >
                                                    <Input name="code" placeholder="Mã cửa hàng sẽ được tạo tự động" hidden />

                                                </Form.Item>
                                            </Col>                               
                                    </Card>
                                </div>
                            </Col>                      
                        </Row>

                    </div>

                </div>
                <hr style={{marginLeft:10}} />
                        <div style={{ float: 'right' }}>
                            <div style={{ display: 'inline' }}>
                                <Button htmlType="submit" style={{ height: 40,width: 120 }} type="primary" >
                                    <span>Lưu</span>
                                </Button>
                            </div>                     
                        </div>
            </Form>
            
            </>
                        );
}
StoreFormUpdate.propTypes = {
    createStore: PropTypes.shape({
        storeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        storeItem: state.storeReducer.storeItem,
        ui: state.storeReducer.ui,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeActionsCreator: bindActionCreators(storeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(StoreFormUpdate));






