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
import * as manufacturerActions from '../../actions/manufacturer';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;



const ManufacturerFromInsert = (props) => {
    const history = useHistory();
    const [manufacturer, setUser] = useState({
        id: null,
        name: null,
        description: null
    })
    const {manufacturerActionsCreator } = props;
    const { actCreateManufacturer } = manufacturerActionsCreator;
    useEffect(()=>{
  
    })
    const onFinish = (values) => {
          actCreateManufacturer(values);
        
    };
    const onFinishFailed = (errorInfo) => {

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
                            name: "name",
                            value: manufacturer.name
                        },                     
                        {
                            name: 'description',
                            value: manufacturer.description
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16}}>
                        <p>
                            <NavLink to="/admin/manufacturer"><LeftOutlined />Danh sách nhà sản xuất</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                            Thêm nhà sản xuất
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={20} >
                                <div  >
                                    <Card title='Thông tin nhà sản xuất' style={{ marginLeft:120,marginBottom: 16, width: '100%' }}>

                                        <Col span={20}>

                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên nhà sản xuất'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên nhà sản xuất!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên nhà sản xuất" />
                                            </Form.Item>
                                        </Col>
                                        <Row>
                                    </Row>
                                             <Col span={20}>
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Ghi chú'
                                                name="description"
                                                rules={[{ required: true, message: '!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="description" placeholder="Nhập ghi chú" />
                                            </Form.Item>
                                        </Col>
                                        <div style={{ float: 'right'}}>
                            <div style={{ display: 'inline' }}>
                                <Button htmlType="submit" style={{ height: 40,width:120,fontWeight:600  }} type="primary" >
                                    <span>Lưu</span>
                                </Button>
                            </div>
                             
                             </div>
                                    </Card>
                                </div>
                            </Col>                                                  
                        </Row>
             
                    </div>
             
                </div>

            </Form>
        </>
    );
}
ManufacturerFromInsert.propTypes = {
    createManufacturer: PropTypes.shape({
        manufacturerActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        manufacturerActionsCreator: bindActionCreators(manufacturerActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ManufacturerFromInsert));