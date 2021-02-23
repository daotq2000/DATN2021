import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as modelbikeActions from '../../actions/modelbike';
import PropTypes from 'prop-types';


const BrandFromInsert = (props) => {
    const history = useHistory();
    let idModelbike = useParams().id;
    const { modelbikeActionsCreator } = props;
    const { modelBikeItem } = props;
    const { actGetModelbike } = modelbikeActionsCreator;
    const { actUpdateModelbike } = modelbikeActionsCreator;
   
    const {id, name, year } = modelBikeItem;
    useEffect(() => {
        if (idModelbike != undefined || idModelbike != null) {
            actGetModelbike(idModelbike);

        }
    }, [])

    const onFinish = (values) => {  
    if(idModelbike != undefined){
        modelBikeItem.name = values.name;
        modelBikeItem.year = values.year;
       actUpdateModelbike(modelBikeItem,idModelbike); 
    }
         
    };
    return (
        <>
            <Form
                onFinish={onFinish}
                layout="vertical"
                name="basic"
                fields={
                    [  {  
                        name: "id",
                        value: id
                        },
                        {  
                            name: "name",
                            value:modelBikeItem.name
                        },
                        {
                            name: 'year',
                            value: modelBikeItem.year                          
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16}}>
                        <p>
                            <NavLink to="/admin/modelbike"><LeftOutlined />Danh sách loại xe</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                           Cập nhật loại xe
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin loại xe' style={{ marginLeft:120, marginBottom: 16, width: '100%' }}>                                         
                                     <Row>
                                     <Col span={10}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên loại xe'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên loại xe!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên loại xe" />
                                                
                                            </Form.Item>
                                        </Col>
                                        <Col style={{marginLeft:20}} span={10} >
                                        <Form.Item
                                            style={{ width: '100%' }}
                                                label='Năm sản xuất:'
                                                name="year"
                                                rules={[{ required: true, message: 'Vui lòng chọn năm sản xuất!' }]}
                                            >
                                                <Input name="year" type="month" />
                                            </Form.Item>
                                        </Col>
                                     </Row>

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
BrandFromInsert.propTypes = {
    createModelbike: PropTypes.shape({
        modelbikeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {  
    return {
        modelBikeItem: state.modelBikeReducer.modelBikeItem,
        totalElement: state.modelBikeReducer.totalElement,
        totalPage: state.modelBikeReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        modelbikeActionsCreator: bindActionCreators(modelbikeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)( BrandFromInsert));