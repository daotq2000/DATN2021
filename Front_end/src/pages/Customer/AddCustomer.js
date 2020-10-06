import React, { useState } from 'react';
import { Row, Col, Card, Input, Form, Button, Cascader, Empty } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as customerActions from '../../actions/customer';
import * as addressActions from '../../actions/address';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
//import history from '../../history';

const AddCustomer = (props) => {

    const [loadDistrict, setLoadDistrict] = useState(false);
    const [loadWard, setLoadWard] = useState(false);
    const [valueWard, setValueWard] = useState(null);
    const [formRef] = Form.useForm();


    const { TextArea } = Input;

    const onReset = () => {
        formRef.resetFields();
    };

    const { customerActionCreators } = props;
    const { addressActionsCreators } = props;
    const { actCreateCustomer } = customerActionCreators;
    const { actGetListProvinces, actGetWardOfDistrict } = addressActionsCreators;

    const { listProvinces, listWards } = props;

    const getAddress = () => {
        if (listProvinces.length > 0) {
            return listProvinces
        } else {
            actGetListProvinces();
            setLoadDistrict(true);
        }
    }

    const mapDistrict = () => {
        let data = [];
        if (loadDistrict) {
            if (listProvinces.length > 0) {
                data = listProvinces.map((provinces, index) => {
                    return {
                        ...provinces,
                        value: provinces.code,
                        label: provinces.province.name + ' - ' + provinces.name,
                    }
                })
            }
        }
        return data;
    }

    const onFinish = values => {
        actCreateCustomer(values);
        //history.push(`/admin/customers`);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onChangeOptions = (value, selectedOptions) => {
        //setValueWard(null)    
        if (value !== undefined) {
            actGetWardOfDistrict(value);
            setLoadWard(true)
            setValueWard(null)
        } else {
            console.log('stsrf');
        }
    }

    const mapWards = () => {
        let data = [];
        if (loadWard) {
            if (listWards.length > 0) {
                data = listWards.map((ward, index) => {
                    return {
                        ...ward,
                        value: ward.code,
                        label: ward.name
                    }
                })
            }
        }
        return data;
    }

    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16 }}>
                    <p><NavLink to='/admin/customers'><LeftOutlined /> Danh sách khách hàng</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                        Thêm mới khách hàng
                    </span>
                </div>
                <div className='customerInfo'>
                    <Form
                        name={'addCustomer'}
                        form={formRef}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        fields={
                            [
                                {
                                    name: "ward",
                                    value: valueWard
                                }
                            ]
                        }

                    >
                        <Row>
                            <Col span={16}>
                                <div>

                                    <Card style={{ width: '97%' }}>
                                        <Form.Item
                                            label='Tên khách hàng'
                                            name="txtName"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                                        >
                                            <Input name="txtName" placeholder="Nhập tên khách hàng" />
                                        </Form.Item>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='Mã khách hàng'
                                                    name="txtcode"
                                                    rules={[{ required: false, message: 'Vui lòng nhập mã khách hàng xe!' }]}
                                                >
                                                    <Input style={{ width: '95%' }} name="txtCode" placeholder="" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Số điện thoại'
                                                    name="txtphoneNumber"
                                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                    {
                                                        pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                        max: 10,
                                                        message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                                    }
                                                    ]}
                                                >
                                                    <Input name="txtphoneNumber" placeholder="Nhập số điện thoại khách hàng" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                        </Row>
                                    </Card>

                                    <Card style={{ width: '97%', marginTop: 35 }}>
                                        <h3>Thông tin địa chỉ</h3>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="txtaddress"
                                                    rules={[{ required: false, message: 'Vui lòng nhập địa chỉ!' }]}
                                                >
                                                    <Input style={{ width: '95%' }} name="txtaddress" placeholder="Nhập địa chỉ" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Khu vực'
                                                    name="district"
                                                    rules={[{ required: false, message: 'Vui lòng chọn Tỉnh thành - quận huyện!' }]}
                                                >
                                                    <Cascader allowClear={false} notFoundContent={"Không có dữ liệu"} locale={{ emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }} showSearch={true} style={{ width: '100%' }} onClick={() => getAddress()} options={mapDistrict()} onChange={onChangeOptions} placeholder="Chọn Tỉnh thành - quận huyện" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Phường xã'
                                                    name="ward"
                                                    rules={[{ required: false, message: 'Vui lòng chọn phường xã!' }]}
                                                >
                                                    <Cascader notFoundContent={"Không có dữ liệu"} locale={{ emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }} style={{ width: '100%' }} options={valueWard === null ? mapWards() : ''} placeholder={valueWard === null ? "Chọn Phường xã" : ''} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <h4>Thông tin khác</h4>
                                    <Form.Item
                                        label='Email'
                                        name="txtemail"
                                        rules={[{ required: false, message: 'Vui lòng nhập email!' }]}
                                    >
                                        <Input name="txtemail" placeholder="Nhập địa chỉ email" />
                                    </Form.Item>
                                    <Form.Item
                                        label='Mô tả'
                                        name="txtdescription"
                                        rules={[{ required: false, message: 'Vui lòng nhập mô tả!' }]}
                                    >
                                        <TextArea rows={2} name="txtdescription" />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>
                        <div style={{ marginTop: 30 }}>
                            <hr />
                            <Form.Item style={{ float: "right", marginRight: 40 }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
                                    Lưu
                                </Button>
                                <Button htmlType="button" onClick={onReset} style={{}}>
                                    Đặt lại
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>

            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        listProvinces: state.addressReducer.provinces,
        listWards: state.addressReducer.wards
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch),
        addressActionsCreators: bindActionCreators(addressActions, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);