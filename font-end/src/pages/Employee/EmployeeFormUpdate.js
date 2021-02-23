import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined, LockOutlined } from '@ant-design/icons';
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
    

    const [state, setState] = useState({
        visible: false,
        validatePassword: true,
        id: null,
        code: null,
        fullName: null,
        phoneNumber: null,
        address: null,
        email: null,
        password: null,
        role: null
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

    const validatePassword = (password, confirm) => {
        return password === confirm ? true : false;
    }

    let idEmployee = useParams().id;
    const { employeeActionsCreator } = props;
    const { actUpdateEmployee } = employeeActionsCreator;
    const { actCreateEmployee } = employeeActionsCreator;
    const { userItem } = props;
    const { actGetEmployee } = employeeActionsCreator;
    const { changePasswordUser } = employeeActionsCreator;

    const onFinish = (values) => {
        console.log('Success:', values);
        let role = 1;
        if (values.role === 'Người quản lý') {
            values.role = 3;
        } else if (values.role === 'Nhân viên sửa chữa') {
            values.role = 2;
        } else {
            values.role = 1;
        }
        if (idEmployee != undefined) {
            actUpdateEmployee(values, idEmployee);
        }
    };

    useEffect(() => {
        setState({
            visible: props.ui.isShowModal,
            clearForm: props.ui.clearForm
        })
    }, [props.ui])

    const onFinishFailed = (errorInfo) => {

        console.log('Failed:', errorInfo);
    };

    const onFinishPassword = (values) => {
        console.log('Password:', values);
        let object = { id: id, password: values.txtPassword, oldPassword: values.oldPassword }

        changePasswordUser(object);

    };
    const onFinishPasswordFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function onChange(value) {
        console.log(`selected ${value}`);
    }
    const { id, code, fullName, phoneNumber, address, email, password, role } = userItem;
    const { txtPassword, txtOldPassword } = '';
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
                            , value: code === undefined ? "":code.toUpperCase() 
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
                            value: role === 1 ? 'Nhân viên điều phối' : role === 2 ? 'Nhân viên sửa chữa' : role === 3 ? 'Người quản lý' : ''
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

                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin nhân viên' style={{ marginBottom: 16, width: '100%' }}>

                                        <Col span={24}>

                                            <Form.Item
                                                label='Tên nhân viên'
                                                name="fullName"
                                                validateTrigger={["onBlur"]}
                                                rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                                            >
                                                <Input name="fullName" placeholder="Nhập tên nhân viên" />
                                            </Form.Item>
                                        </Col>

                                        <Row>
                                            <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item style={{ width: '95%' }}
                                                    label='Mã nhân viên'
                                                    name="code"
                                                    validateTrigger={["onBlur"]}
                                                >
                                                    <Input name="code" placeholder="Mã nhân viên sẽ được tạo tự động" />
                                                </Form.Item>
                                            </Col>

                                            <Col span={12} style={{ width: '98%' }}>
                                                <Form.Item
                                                    label='Số điện thoại'
                                                    name="phoneNumber"
                                                    rules={
                                                        [
                                                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                            {
                                                                pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                                max: 10,
                                                                message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                                            }
                                                        ]
                                                    }
                                                    validateTrigger={["onBlur"]}
                                                >
                                                    <Input name="phoneNumber" placeholder="Nhập số điện thoại" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col span={24}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="address"
                                                >
                                                    <Input name="address" placeholder="Nhập địa chỉ nhân viên" />
                                                </Form.Item>
                                            </Col>

                                        </Row>


                                    </Card>
                                </div>
                            </Col>

                            <Col span={6}>
                                <Card style={{ width: '100%', marginLeft: '5%', height: '380px' }} title='Tài khoản '>

                                    <Row>
                                        <Form.Item
                                            style={{ width: '100%' }}
                                            label='Email nhân viên'
                                            name="email"
                                            rules={[{ required: true, message: 'Vui lòng nhập Email!' }, {
                                                pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                                message: "Email phải chứa @"
                                            }]}
                                            validateTrigger={["onBlur"]}
                                        >
                                            <Input name="email" width={200} disabled={true} placeholder="Nhập email nhân viên" />
                                        </Form.Item>
                                    </Row>

                                    <Row>

                                        <Col span={24}>
                                            <Form.Item style={{ width: '100%' }}
                                                label='Vai trò nhân viên'
                                                name="role"
                                                rules={[{ required: false, message: 'Vui lòng chọn vai trò nhân viên!' }]}
                                                initialValue={2}
                                                validateTrigger={["onBlur"]}
                                            >

                                                <Select

                                                    // labelInValue={{value:1,label:'Nhân viên điều phối'},{value:2,label:'Nhân viên sửa chữa'},{value:3,label:'Người quản lý'}}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn vai trò"
                                                    optionFilterProp="children"

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
                <hr style={{marginLeft:10}} />
                        <div style={{ float: 'right' }}>
                            <div style={{ display: 'inline' }}>
                                <Button htmlType="submit" style={{ height: 40,width: 120 }} type="primary" >
                                    <span>Lưu</span>
                                </Button>
                            </div>
                            {/* <div style={{ display: 'inline', marginLeft: 5, marginTop: '20px' }}>
                                <Button onClick={showModal} style={{ height: 37 }}><LockOutlined />Đổi mật khẩu</Button>
                            </div> */}
                        </div>
            </Form>
            <div>
                <Modal width={300}
                    title="Đổi mật khẩu"
                    visible={state.visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Hủy bỏ"
                    okText="Đổi mật khẩu"
                    footer={[
                        <Button key={1} onClick={handleCancel}>
                            Quay lại
                                        </Button>,
                        <Button form="changePassword" key="submit" htmlType="submit" type="primary" >
                            Đổi mật khẩu
                                        </Button>
                    ]}
                >
                    <Form
                        onFinish={onFinishPassword}
                        onFinishFailed={onFinishPasswordFailed}
                        name={'changePassword'}
                        layout="vertical"

                        fields={
                            [
                                {
                                    name: 'oldPassword',
                                    value: txtOldPassword
                                },
                                {
                                    name: 'id',
                                    value: id
                                },
                                {
                                    name: 'password',
                                    value: txtPassword
                                }
                            ]
                        }
                    >
                        <Row>
                            <Form.Item style={{ marginLeft: '25px' }}
                                label='Mật khẩu cũ'
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                name="oldPassword"
                            >
                                <Input.Password name="oldPassword" placeholder="Mật khẩu cũ" />
                            </Form.Item>

                        </Row>
                        <Row>
                            <Form.Item style={{ marginLeft: '25px' }}
                                label='Mật khẩu mới'
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },
                                ]}
                                name="newPassword"
                                dependencies={['newPassword']}
                                hasFeedback
                            >
                                <Input.Password name="newPassword" placeholder="Mật khẩu mới" />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item style={{ marginLeft: '25px' }}
                                label='Xác nhận mật khẩu'
                                name="txtPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' }
                                    ,
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject('Mật khẩu không khớp! Hãy thử lại');
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password name="txtPassword" placeholder="Xác nhận mật khẩu" />
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
        ui: state.employeeReducer.ui,


    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeForm));






