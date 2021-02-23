import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as colorBikeActions from '../../actions/colorBike';
import PropTypes from 'prop-types';


const BrandFromInsert = (props) => {
    const history = useHistory();
    let idColoBike = useParams().id;
    const { colorBikeActionsCreator } = props;
    const { colorBikeItem } = props;
    const { actGetColorBike } = colorBikeActionsCreator;
    const { actUpdateColorBike } = colorBikeActionsCreator;
   
    const {id, name } = colorBikeItem;
    useEffect(() => {
        if (idColoBike != undefined || idColoBike != null) {
            actGetColorBike(idColoBike);

        }
    }, [])

    const onFinish = (values) => {  
    if(idColoBike != undefined){
        colorBikeItem.name = values.name;
        actUpdateColorBike(colorBikeItem,idColoBike); 
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
                            value:colorBikeItem.name
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16}}>
                        <p>
                            <NavLink to="/admin/colorbike"><LeftOutlined />Danh sách màu</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                           Cập nhật màu
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin mẫu xe' style={{ marginLeft:120, marginBottom: 16, width: '100%' }}>                                         
                                     <Row>
                                     <Col span={10}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên màu'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập màu!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên màu" />
                                                
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
        colorBikeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {  
    return {
        colorBikeItem: state.colorBikeReducer.colorBikeItem,     
    }
};

const mapDispatchToProps = dispatch => {
    return {
        colorBikeActionsCreator: bindActionCreators(colorBikeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)( BrandFromInsert));