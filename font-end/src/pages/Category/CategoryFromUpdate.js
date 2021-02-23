import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/category';
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
    let idCategory = useParams().id;
    const { categoryActionsCreator } = props;
    const {categoryItem } = props;
    const { actGetCategory } = categoryActionsCreator;
    const { actUpdateCategory } = categoryActionsCreator;
   
    useEffect(()=>{
  
    })
    const { id, name, description } = categoryItem;
    useEffect(() => {
        if (idCategory != undefined || idCategory != null) {
            actGetCategory(idCategory);

        }
    }, [])

    const onFinish = (values) => {  
    if(idCategory != undefined){
        actUpdateCategory(values,idCategory);  
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
                            <NavLink to="/admin/category"><LeftOutlined />Danh sách danh mục sản phẩm</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                           Cập nhật danh mục sản phẩm
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin danh mục sản phẩm' style={{ marginLeft:120, marginBottom: 16, width: '100%' }}>                                         
                                        <Col span={20}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên danh mục sản phẩm'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên danh mục sản phẩm!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập tên tdanh mục sản phẩm" />
                                                
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
    createCategory: PropTypes.shape({
        categoryActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        categoryItem: state. categoryReducer. categoryItem,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        categoryActionsCreator: bindActionCreators(categoryActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)( BrandFromInsert));