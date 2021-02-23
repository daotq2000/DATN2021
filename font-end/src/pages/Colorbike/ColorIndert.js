import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { Button, Row, Col, Card, Input, Form, Cascader } from 'antd';
import { LeftOutlined} from '@ant-design/icons';
import {  NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as colorBikeActions from '../../actions/colorBike';
import * as modelBikeActions from '../../actions/modelbike';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;



const ManufacturerFromInsert = (props) => {
    const history = useHistory();
    const [colorBike, setColorBike] = useState({
        name: null,
        modelBike:null,
    })
    const {modelBikeActionsCreator,colorBikeActionsCreator } = props;
    const { actCreateColorBike } = colorBikeActionsCreator;
   const { actFetchData } =  modelBikeActionsCreator;
   const { modelBikes, totalPage, totalElement } = props;
    useEffect(()=>{
        actFetchData(1, 9999, '', '', "");
    },[actFetchData]);
 
    
    const onFinish = (values) => {
        //console.log(values)
        colorBike.name = values.name;
        colorBike.modelBike = {id:values.id};
        actCreateColorBike(colorBike);
        
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
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16}}>
                        <p>
                            <NavLink to="/admin/colorbike"><LeftOutlined />Danh sách màu</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                            Thêm màu
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={20} >
                                <div  >
                                    <Card title='Thông tin màu' style={{ marginLeft:120,marginBottom: 16, width: '100%' }}>
                                    <Row>
                                     <Col span={10}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên màu'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên mẫu xe!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="name" placeholder="Nhập màu" />
                                                
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}  style={{ marginLeft:120,marginBottom: 16, width: '100%' }}>
                                    <Form.Item
                                        label='Mẫu xe'
                                        name="id"
                                        rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất!' }]}
                                    >                                            
                                <Select placeholder="Mẫu xe" >
                       {modelBikes.map((lead) => (                    
                       <option value={lead.id}>{lead.name}</option>
                    ))}
                      </Select>
                   
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
ManufacturerFromInsert.propTypes = {
    createManufacturer: PropTypes.shape({
        colorBikeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return { 
        
        modelBikes: state.modelBikeReducer.modelBikes,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        colorBikeActionsCreator: bindActionCreators(colorBikeActions,dispatch),
        modelBikeActionsCreator: bindActionCreators( modelBikeActions , dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ManufacturerFromInsert));