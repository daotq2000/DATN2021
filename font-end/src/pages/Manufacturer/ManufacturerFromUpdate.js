import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as manufacturerActions from '../../actions/manufacturer';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;



const BrandFromInsert = (props) => {
    // const history = useHistory();
    // const [manufacturer, setUser] = useState({
    //     id: null,
    //     name: null,
    //     description: null
    // })
    let idManufacturer = useParams().id;
    const { manufacturerActionsCreator } = props;
    const { manufacturerItem } = props;
    const { actGetManufacturer } = manufacturerActionsCreator;
    const { actUpdateManufacturer } = manufacturerActionsCreator;
   
    useEffect(()=>{
  
    })
    const { id, name, description } = manufacturerItem;
    useEffect(() => {
        if (idManufacturer != undefined || idManufacturer != null) {
            actGetManufacturer(idManufacturer);

        }
    }, [])

    const onFinish = (values) => {  
    if(idManufacturer != undefined){
        actUpdateManufacturer(values,idManufacturer);  
    }
         
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
                            name: "id",
                            value: id
                        },
                        {  
                            name: "name",
                            value: name
                        },
                        {
                            name: 'description',
                            value: description
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
                           Cập nhật nhà sản xuất
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin nhà sản xuất' style={{ marginLeft:120, marginBottom: 16, width: '100%' }}>                                         
                                        <Col span={20}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên nhà sản xuất'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên thương hiệu" />
                                                
                                            </Form.Item>
                                        </Col>
                                        <Col span={20} >
                                        <Form.Item
                                            style={{ width: '100%' }}
                                                label='Ghi chú'
                                                name="description"
                                            >
                                                <Input  name="description" placeholder="Nhập ghi chú" />
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
BrandFromInsert.propTypes = {
    createManufacturer: PropTypes.shape({
        manufacturerActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        manufacturerItem: state. manufacturerReducer. manufacturerItem,
        totalElement: state.manufacturerReducer.totalElement,
        totalPage: state. manufacturerReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        manufacturerActionsCreator: bindActionCreators(manufacturerActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)( BrandFromInsert));