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
import * as serviceActions from '../../actions/service';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Modal } from 'antd';
const { Option } = Select;

const ServiceFormUpdate = (props) => {
 

    const [state, setState] = useState({
        visible: false,
        id: null,
        code: null,
        name: null,
        price: null,       
        time: null,
        description: null,
        timeGuarantee: null,
        status: 1
    });

    let idService = useParams().id;
    const { serviceActionsCreator } = props;
    const { serviceItem } = props;
    const { actGetItemService } = serviceActionsCreator;
    const { actUpdateService } = serviceActionsCreator;
    useEffect(() => {
   
    })
    const { id, code, name, price, time, description, timeGuarantee, status } = serviceItem;

    useEffect(() => {
        if (idService !== undefined || idService !== null) {

            actGetItemService(idService);
        }
    }, [])
    const onFinish = (values) => {      
        actUpdateService(idService,values);    
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                            name: 'price',
                            value: price
                        },
                        {
                            name: 'time',
                            value: time
                        },
                        {
                            name: 'timeGuarantee',
                            value: timeGuarantee
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
                            <NavLink to="/admin/v2/services"><LeftOutlined />Danh sách dịch vụ</NavLink>
                        </p>
                        
                    </div>

                    <div className='serviceInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Cập nhập dịch vụ' style={{ marginBottom: 16, width: '100%', marginLeft: '70px'  }}>
                                    <Row>
                                        <Col span={12} style={{width:'98%'}}>
                                            <Form.Item
                                                style={{width:'95%'}}
                                                label='Tên dịch vụ'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên dịch vụ" style={{}} />
                                            </Form.Item>
                                        </Col> 
                                            <Col span={12} style={{width:'98%' }}>
                                                <Form.Item
                                                    label='Giá'
                                                    name="price" 
                                                    rules={[{required: true, message: 'Vui lòng nhập giá tiền'}]} 
                                                    validateTrigger={["onBlur"]}                                                 
                                                >
                                                    <Input placeholder="Nhập giá" />
                                                  </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>                                           
                                            <Col span={12} style={{width:'98%'}}>
                                                <Form.Item
                                                    style={{width:'95%'}}
                                                    label='Thời gian hoàn thành'
                                                    name="time"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thời gian bảo hành!' },
                                                            {pattern: '^([0-1]?[0-9]|2[0-3])-[0-5][0-9]$'}
                                                            ]}
                                                    validateTrigger={["onBlur"]}
                                                >                                                 
                                                    <Input   name="time" placeholder="Ví dụ: 5-10" />
                                                </Form.Item>
                                            </Col>                                                                                          
                                            <Col span={12} style={{width:'98%'}}>
                                                <Form.Item
                                                    label='Thời gian bảo hành'
                                                    name="timeGuarantee"
                                                    rules={[{required: true, message: 'Vui lòng nhập thời gian bảo hành'}]}
                                                    validateTrigger={["onBlur"]}
                                                >
                                                    <Input name="timeGuarantee" placeholder="Thời gian bảo hành" />
                                                    
                                                </Form.Item>
                                            </Col>
                                            </Row>
                                            <Row>
                                            <Col span={24} style={{width:'100%'}}>
                                                <Form.Item
                                                style={{}}
                                                    label='Mô tả'
                                                   name="description"                                                  
                                                >
                                                    <textarea rows='3' name="description" placeholder="Nhập thông tin" style={{width:'100%'}} ></textarea>
                                                </Form.Item>
                                            </Col>
                                            </Row>
                                            <Row>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                              
                                                   name="status"                                                  
                                                >
                                                    <Input name="status" readOnly hidden />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} >
                                                <Form.Item 

                                                  
                                                    name="code"

                                                >
                                                    <Input name="code" placeholder="Mã dịch vụ sẽ được tạo tự động" hidden />

                                                </Form.Item>
                                            </Col>
                                        </Row>
                                   </Card>
                                </div>
                            </Col>                
                        </Row>

                    </div>

                </div>
                <hr style={{ marginLeft: 10 }} />
                <div style={{ float: 'right' }}>
                    <div style={{ display: 'inline' }}>
                        <Button htmlType="submit" style={{ height: 40, width: 120, fontWeight: 600 }} type="primary" >
                            <span>Lưu</span>
                        </Button>
                    </div>           
                        </div>
            </Form>
            
            </>
                        );
}
ServiceFormUpdate.propTypes = {
    createService: PropTypes.shape({
        serviceActionsCreator: PropTypes.func,
    })
}
const mapStateToProps = state => {
    return {
        serviceItem: state.serviceReducer.serviceItem,
        totalElement: state.serviceReducer.totalElement,
        totalPage: state.serviceReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        serviceActionsCreator: bindActionCreators(serviceActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ServiceFormUpdate));






