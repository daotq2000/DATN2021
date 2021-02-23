import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as couponActions from '../../actions/coupon';
import PropTypes from 'prop-types';
import { Select } from 'antd';
 
import "react-datepicker/dist/react-datepicker.css";
const { Option } = Select;

const CouponForm = (props) => {
    const history = useHistory();
    const [coupons, setCoupon] = useState({
        id: null,
        code: null,
        name: null,
        discount: null,
        expiredDate: null,
        quantity: null,
        description: null,
        status: 1
   
    })
   
    const { couponActionsCreator } = props;
    const { couponItem } = props;
    const { actCreateCoupon } = couponActionsCreator;

    const { actCreateCouponSuccess } = couponActionsCreator;
    console.log(props);
    useEffect(() => {
        console.log(couponItem.id);
    })
    const onFinish = (values) => {
        console.log('Success:', values);
        actCreateCoupon(values);

    };

    const onFinishFailed = (errorInfo) => {

    };
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const [value] = useState(new Date());

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

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
                            name: 'code'
                            , value: coupons.code
                        },
                        {
                            name: 'expiredDate',
                            value: coupons.expiredDate
                        },
                        {
                            name: 'discount',
                            value: coupons.discount
                        },                      
                        {
                            name: 'description',
                            value: coupons.description
                        },
                        {
                            name: 'status',
                            value: coupons.status
                        },
                        {
                            name: 'name',
                            value: coupons.name
                        },
                        {
                            name: 'quantity',
                            value: coupons.quantity
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16, marginTop: -30 }}>
                        <p>
                            <NavLink to="/admin/coupons"><LeftOutlined />Danh sách phiếu</NavLink>
                        </p>
           

                    </div>

                    <div className='couponInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thêm mới phiếu giảm giá' style={{ marginBottom: 16,width: '100%', marginLeft: '70px'}}>
                                        <Row>
                                        <Col span={12} style={{width:'98%'}}>
                                            <Form.Item
                                                style={{ width: '95%' }}
                                                label='Tên phiếu'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên phiếu!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên phiếu" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item
                                                style={{width:'95%'}}
                                                    label='Ngày hết hạn'
                                                    name="expiredDate"
                                                     validateTrigger={["onBlur"]}
                                                     rules={
                                                         [
                                                             { required: true, message: 'Vui lòng nhập ngày hết hạn!' },                                      
                                                         ]
                                                    }
                                                >
                                                    <Input type="date"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col span={12} style={{width:'98%'}}>
                                                <Form.Item
                                                style={{width:'95%'}}
                                                    label='Giảm giá'
                                                    name="discount"
                                                    validateTrigger={["onBlur"]}
                                                    rules={
                                                        [
                                                            { required: true, message: 'Vui lòng nhập giá khuyến mãi!' },
                                                          
                                                        ]
                                                    }
                                                >
                                                    <Input name="discount" placeholder="Nhập giảm giá " type="number" />
                                                </Form.Item>
                                            </Col>          
                                            <Col span={12} style={{width:'98%'}}>
                                                <Form.Item
                                                style={{width:'95%'}}
                                                    label='Số lượng'
                                                   name="quantity" 
                                                   rules={
                                                        [
                                                            { required: true, message: 'Vui lòng nhập số lượng phiếu khuyến mãi!' },
                                                        ]
                                                    }                                                 
                                                >
                                                    <Input name="quantity" placeholder="Nhập số lượng" type="number" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24} style={{width:'100%'}}>
                                                <Form.Item
                                                    style={{width:'100%'}}
                                                    label='Mô tả'
                                                   name="description"                                                  
                                                >
                                                    <textarea rows='3' name="description" placeholder="Nhập thông tin" style={{width:'100%'}} ></textarea>
                                                </Form.Item>
                                            </Col>
                                            </Row>
                                            <Row>
                                        <Col span={24}>
                                  
                                            <Form.Item style={{ width: '100%' }}   
                                                  name="status"                                            
                                            >
                                            <Input name="status" hidden />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item
                                                    name="code"
                                                >
                                                    <Input name="code" hidden />

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
CouponForm.propTypes = {
    createCoupon: PropTypes.shape({
        couponActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        couponItem: state.couponReducer.couponItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        couponActionsCreator: bindActionCreators(couponActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CouponForm));






