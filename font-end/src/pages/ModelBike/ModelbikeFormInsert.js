import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { Button, Row, Col, Card, Input, Form, DatePicker } from 'antd';
import { LeftOutlined} from '@ant-design/icons';
import {  NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import {
    getManufacturerPage
  
  } from '../../apis/manufacturer'   
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as modelbikeActions from '../../actions/modelbike';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { MenuItem } from "@material-ui/core";
const { Option } = Select;



const ManufacturerFromInsert = (props) => {
    const history = useHistory();
    const [manufacture, setManufacture] = useState([]);
    const [modelbike, setmodelbike] = useState({
        name: null,
        year: null,
        manufacture:null,
    })
    const {modelbikeActionsCreator,manufacturerActionsCreator } = props;
    const { actCreateModelbike } = modelbikeActionsCreator;

    useEffect(()=>{
        getManufacturerPage(1,99999,"","","").then(({ data }) => {
            setManufacture(data.manufacturer);
              // totalElements: data.totalElements,         
          })
         
          
    },[actCreateModelbike])
 
    function onPanelChange(value, mode) {
        console.log(value, mode);
      }
    const onFinish = (values) => {
        
       
        modelbike.name = values.name;
        modelbike.year = values.year;
        modelbike.manufacture = {id:values.id};
        actCreateModelbike(modelbike);
        
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
                            <NavLink to="/admin/modelbike"><LeftOutlined />Danh sách loại xe</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                            Thêm mới loại xe
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={20} >
                                <div  >
                                    <Card title='Thông tin loại xe' style={{ marginLeft:120,marginBottom: 16, width: '100%' }}>
                                       <div style={{ marginLeft:120,marginBottom: 16, width: '100%' }}  >
                                       <Row>
                                     <Col span={7}> 
                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên loại xe'
                                                name="name"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên loại xe!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input style={{height:'40px'}} name="name" placeholder="Nhập tên loại xe" />
                                                
                                            </Form.Item>
                                        </Col>
                                        <Col style={{marginLeft:20}} span={5} >
                                        <Form.Item
                                            style={{ width: '100%' }}
                                                label='Năm sản xuất:'
                                                name="year"
                                                rules={[{ required: true, message: 'Vui lòng chọn năm sản xuất!' }]}
                                            >
                                                <Input style={{height:'40px'}} name="year" type="month" />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{marginLeft:20}}  span={7}>
                                    <Form.Item
                                        label='Nhà sản xuất'
                                        name="id"
                                        rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất!' }]}
                                    >                                            
                                   <Select  placeholder=" Chọn nhà sản xuất"
                                                        >
                                               {manufacture.map((lead) => (
                                        <option value={lead.id}>{lead.name}</option>
                                       ))}
                                        </Select>
                   
                                    </Form.Item>
                                </Col>
                                     </Row>
                                       </div>
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
        modelbikeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return { 
        
        manufacturers: state.manufacturerReducer.manufacturers,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        modelbikeActionsCreator: bindActionCreators(modelbikeActions,dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ManufacturerFromInsert));