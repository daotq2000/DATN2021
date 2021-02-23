import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import { formatDate } from '../../utils/DateFormat';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as couponActions from '../../actions/coupon';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Modal } from 'antd';
const { Option } = Select;



const CouponFormUpdate = (props) => {
    console.log(props);

    const [state, setState] = useState({
        visible: false,
        id: null,
        code: null,
        name: null,
        discount: null,
        expiredDate: null,    
        quantity: null,
        description: null,
        status: 1
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


    let idCoupon = useParams().id;
    const { couponActionsCreator } = props;
    const { actUpdateCoupon } = couponActionsCreator;
    const { actCreateCoupon } = couponActionsCreator;
    const { couponItem } = props;
    const { actGetItemCoupon } = couponActionsCreator;
    useEffect(() => {
   
    })
    const { id, code, name, discount, expiredDate, description, status, quantity } = couponItem;
    const onFinishFailed = (errorInfo) => {

        console.log('Failed:', errorInfo);
    };

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const [value] = useState(expiredDate);
    

    useEffect(() => {
        if (idCoupon != undefined || idCoupon != null) {
            actGetItemCoupon(idCoupon);
        }
    }, [])

    const onFinish = (values) => {
        console.log(values);
        let a = (values.expiredDate).toString();
        values.expiredDate = new Date(a.substring(6,a.length));
        console.log(values);
         
        actUpdateCoupon(idCoupon, values);
    
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
                            name: 'discount',
                            value: discount
                        },
                        {
                            name: 'expiredDate',
                            value: formatDate(expiredDate),                                              
                        },
                        {
                            name: 'description',
                            value: description
                        }, 
                        {
                            name: 'quantity',
                            value: quantity
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
                            <NavLink to="/admin/coupons"><LeftOutlined />Danh sách phiếu</NavLink>
                        </p>
               

                    </div>

                    <div className='couponInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Sửa đổi thông tin phiếu' style={{ marginBottom: 16,width: '100%', marginLeft: '70px'}}>
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
                                                   {/* <DatePicker
                                                    onChange={onChange}
                                                      value={value}
                                                     />  */}
                                         
                                         <Input              
            />
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
                                                    <Input name="quantity" placeholder="Nhập số lượng" type="number"/>
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
CouponFormUpdate.propTypes = {
    createCoupon: PropTypes.shape({
        couponActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        couponItem: state.couponReducer.couponItem,
        totalElement: state.couponReducer.totalElement,
        totalPage: state.couponReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        couponActionsCreator: bindActionCreators(couponActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CouponFormUpdate));






