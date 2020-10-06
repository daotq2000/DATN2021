import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined,LockOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as employeeActions from '../../actions/employee';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Modal } from 'antd';
const { Option } = Select;



const EmployeeForm = (props) => {
 
    const [state,setState] = useState({
        visible:false
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

    let idEmployee = useParams().id;
    const { employeeActionsCreator } = props;
    const { actUpdateEmployee } = employeeActionsCreator;
    const { actCreateEmployee } = employeeActionsCreator;
    const { userItem } = props;
    const { actGetEmployee } = employeeActionsCreator;
    const { changePasswordUser } = employeeActionsCreator;
    

    const onFinish = (values) => {
        console.log('Success:', values);

        if (idEmployee != undefined) {
            actUpdateEmployee(values, idEmployee);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishPassword = (values) => {
        console.log('Password:', values);
        let object = {id:id,password:values.txtPassword}
        changePasswordUser(object)
        setState({visible:false})
        // console.log(values.txtPassword);
    };

    const onFinishPasswordFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    const { id, code, fullName, phoneNumber, address, email, password, role } = userItem;
    const {txtPassword} = '';
    useEffect(() => {
        if (idEmployee != undefined || idEmployee != null) {
            actGetEmployee(idEmployee);
        }
    }, [])

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
                            value: idEmployee
                        },
                        {
                            name: "fullName",
                            value: fullName
                        },
                        {
                            name: 'code'
                            , value: code
                        },
                        {
                            name: 'phoneNumber',
                            value: phoneNumber
                        },
                        {
                            name: 'address',
                            value: address
                        },
                        {
                            name: 'email',
                            value: email
                        },
                        {
                            name: 'password',
                            value: password
                        },
                        {
                            name: 'role',
                            value: role
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16, marginTop: -30 }}>
                        <p>
                            <NavLink to="/admin/employees"><LeftOutlined />Danh sách nhân viên</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                            Sửa đổi nhân viên
                </span>
                        <div style={{ float: 'right' }}>
                            <div style={{ display: 'inline' }}>
                                <Button htmlType="submit" style={{ height: 37, marginRight: 5 }} type="primary" >
                                    <span>Cập nhật</span>
                                </Button>
                            </div>
                            <div style={{ display: 'inline', marginLeft: 5, marginTop: '20px' }}>
                                <Button onClick={showModal} style={{ height: 37 }}><LockOutlined />Đổi mật khẩu</Button>
                            </div>
                        </div>
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={17} >
                                <div  >
                                    <Card title='Thông tin nhân viên' style={{ width: '100%', height: '355px' }}>


                                        <Form.Item
                                            label='Mã nhân viên'
                                            name="code"
                                        >
                                            <Input name="code" placeholder="Mã nhân viên sẽ được tạo tự động nếu bạn không nhập " />
                                        </Form.Item>
                                        <Row>
                                            <Col span={10}>
                                                <Form.Item style={{ display: 'none' }}
                                                    label='Tên nhân viên'
                                                    name="id"
                                                    rules={[{ required: false, message: 'Vui lòng nhập tên nhân viên!' }]}
                                                >
                                                    <Input name="id" />
                                                </Form.Item>
                                                <Form.Item
                                                    label='Tên nhân viên'
                                                    name="fullName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                                                >
                                                    <Input name="fullName" placeholder="Tên nhân viên" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}></Col>
                                            <Col span={10}>
                                                <Form.Item  
                                                    label='Số điện thoại'
                                                    name="phoneNumber"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, {
                                                        pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                        max: 10,
                                                        message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                                    }]}
                                                >
                                                    <Input name="phoneNumber" placeholder="Số điện thoại" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col span={24}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="address"
                                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                                >
                                                    <Input name="address" placeholder="Địa chỉ nhân viên" />
                                                </Form.Item>
                                            </Col>

                                        </Row>


                                    </Card>
                                </div>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={6}>
                                <Card style={{ height: '355px' }} title='Tài khoản & mật khẩu'>

                                    <Row>
                                        <Form.Item  
                                            label='Email nhân viên'
                                            name="email"
                                            rules={[{ required: true, message: 'Vui lòng nhập Email!' }, {
                                                pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                                message: "Email không được phép chứa ký tự đặc biệt"
                                            }]}
                                        >
                                            <Input name="email"   width={200} disabled={true} placeholder="Email nhân viên" />
                                        </Form.Item>
                                    </Row>
                               
                                    <Row>

                                        <Col span={24}>
                                            <Form.Item style={{width:'200px'}}
                                                label='Vai trò nhân viên'
                                                name="role"
                                                rules={[{ required: false, message: 'Vui lòng chọn vai trò nhân viên!' }]}
                                                initialValue={2}
                                           >

                                                <Select
                                                   
                                                   
                                                    style={{ width: 186 }}
                                                    placeholder="Chọn vai trò"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                   
                                                    
                                                >
                                                    <Option value="3">Người quản lý</Option>
                                                    <Option value="1">Nhân viên điều phối</Option>
                                                    <Option value="2">Nhân viên sửa chữa</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                    </div>

                </div>
                
            </Form>
            <div>
            <Modal  width={300}
                    title="Đổi mật khẩu"
                    visible={state.visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Hủy bỏ"
                    okText="Đổi mật khẩu"
                >
                    <Form 
                    onFinish={onFinishPassword}
                    onFinishFailed={onFinishPasswordFailed}
                    name={'changePassword'}
                    layout="vertical"
                     fields={
                         [
                             {
                                 name:'id',
                                 value:id
                             },
                             {name:'password',
                            value:txtPassword}
                         ]
                     }                                   
                    >
                   <Row>
                   <Form.Item style={{marginLeft:'25px'}}
                        label='Mật khẩu cũ'
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        name="oldPassword"
                    >
                        <Input.Password name="oldPassword"   placeholder="Mật khẩu cũ" />
                    </Form.Item>
                   
                   </Row>
                   <Row>
                   <Form.Item style={{marginLeft:'25px'}}
                        label='Mật khẩu mới'
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        name="newPassword"
                    >
                        <Input.Password  name="newPassword"   placeholder="Mật khẩu mới" />
                    </Form.Item>
                   </Row>
                    <Row>
                    <Form.Item style={{marginLeft:'25px'}}
                        label='Xác nhận mật khẩu'
                        name="txtPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        
                    >
                        <Input.Password  name="txtPassword" placeholder="Xác nhận mật khẩu" />
                    </Form.Item>
                    </Row>
                    <Row>
                    </Row>
                    </Form>
                   
                </Modal>
                </div>
        </>
    );
}
EmployeeForm.propTypes = {
    createEmployee: PropTypes.shape({
        employeeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        userItem: state.employeeReducer.userItem,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeForm));






