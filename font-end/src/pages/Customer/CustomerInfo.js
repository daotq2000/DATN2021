import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select, Card, Tabs, Modal, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as customerActions from '../../actions/customer';
import * as maintenanceCardAddActions from '../../actions/maintenanceCardAdd';
import history from '../../history';
import MaintenanceCard from './MaintenanceCard';
import { formatDate } from '../../utils/DateFormat';
import { formatMonney } from '../../utils/MonneyFormat';
import PaymentHistories from './PaymentHistories';
//import moment from 'moment';

const CustomerInfo = (props) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { customerActionCreators } = props;
    const { actGetCustomerById, actUpdateMultipleStatusCustomer } = customerActionCreators;
    const { customerItem } = props;

    useEffect(() => {
        actGetCustomerById(props.match.params.id)
    }, [actGetCustomerById, props.match.params.id]);

    const { Option } = Select;

    const { TabPane } = Tabs;

    const handleChange = (value) => {
        //alert(`selected ${value}`);
        if (value === 'delete') {
            // window.confirm("Bạn có chắc chắn muốn xóa khách hàng?");
            // actDeleteCustomer([props.match.params.id]);
            // history.push(`/admin/customers`)
            setVisible(true)

        }
        if (value === 'update') {
            history.push(`/admin/customers/update/${props.match.params.id}`)
        }
    }

    const renderTitleCard = () => {
        return (
            <>
                <Row>
                    <Col span={8}>Thông tin cá nhân</Col>
                    <Col span={8}><span style={{ marginLeft: 87 }}>{customerItem !== undefined ? customerItem.pay_status === "1" ? <Tag color='success'>Đã thanh toán</Tag> : customerItem.pay_status === "2" ? <Tag color='magenta'>Chưa tạo phiếu</Tag> : <Tag color='warning'>Chưa thanh toán</Tag> : ''} </span></Col>
                    <Col span={8}>
                        <Select value="Chọn chức năng" style={{ float: 'right', width: '40%' }} onChange={handleChange} >
                            <Option value="update">Cập nhật thông tin</Option>

                            {props.user.role === 3 ? <Option value="delete">Xóa khách hàng</Option> : <></>}
                        </Select>
                                              
                        {/* <div style={{ float: 'right' }}>
                            {props.user.role === 3 ? <Button type="primary" danger>
                                Xóa</Button> : <></>}
                            <Button type="primary">Cập nhật</Button>
                        </div> */}
                    </Col>

                </Row>
            </>
        )
    }

    //model delete

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            //actDeleteCustomer([props.match.params.id]);
            actUpdateMultipleStatusCustomer([props.match.params.id]);
            // history.push(`/admin/customers`)
        }, 500);
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const createMaintenanceCardWithCustomer = () => {
        let customer = {};
        customer.id = customerItem.id
        customer.name = customerItem.name
        customer.phoneNumber = customerItem.phoneNumber
        const { maintenanceCardAddActionCreators } = props;
        const { actCreateMaintenanceCardWithCustomer } = maintenanceCardAddActionCreators;
        actCreateMaintenanceCardWithCustomer(customer)
    }

    const renderBodyCard = () => {

        return (
            <>
                <Row style={{}}>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6 }}>
                            <Col span={8}>Mã khách hàng</Col>
                            <Col span={16}>: {customerItem !== undefined ? (customerItem.code) : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Tên khách hàng</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.name : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Số điện thoại</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.phoneNumber : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8} style={{marginLeft: -23}}>
                        <Row style={{ marginBottom: 6 }}>
                            <Col span={8}>Nợ hiện tại</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.current_debt !== null ? formatMonney(customerItem.current_debt) : null : null} đ</Col>
                        </Row>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Ngày tạo</Col>
                            <Col span={16}>: {customerItem !== undefined ? formatDate(customerItem.createdDate) : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Ngày sửa</Col>
                            <Col span={16}>: {customerItem !== undefined ? formatDate(customerItem.modifiedDate) : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Email</Col>
                            <Col span={19}>: {customerItem !== undefined ? customerItem.email !== null ? customerItem.email : '--' : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Mô tả</Col>
                            <Col span={19}>: {customerItem !== undefined ? customerItem.description !== null ? customerItem.description : '--' : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Địa chỉ </Col>
                            <Col span={19}>
                                : {customerItem !== undefined ? customerItem.address : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null ? customerItem.ward.district.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null && customerItem.ward.district.province !== null ? customerItem.ward.district.province.name : null}
                            </Col>
                        </Row>
                    </Col>

                    {/* <Col span={8}>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={12}>Địa chỉ</Col>
                            <Col span={12}>: {customerItem !== undefined ? customerItem.address : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={12}>Phường xã</Col>
                            <Col span={12}>: {customerItem.ward !== undefined ? customerItem.ward.name :  null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={12}>Quận huyện</Col>
                            <Col span={12}>: {customerItem.ward !== undefined ? customerItem.ward.district.name :  null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={12}>Tỉnh - Thành Phố</Col>
                            <Col span={12}>: {customerItem.ward !== undefined ? customerItem.ward.district.province.name :  null}</Col>
                        </Row>
                    </Col> */}
                </Row>
            </>
        )
    }

    const callback = (key) => {

    }
    return (
        <>
            <div>
                <Modal
                    visible={visible}
                    title="Xóa khách hàng"
                    onCancel={handleCancel}
                    onOk={handleOk}
                    cancelText={"Thoát"}
                    okText={"Xóa"}
                    confirmLoading={confirmLoading}
                >
                    <p>Bạn có chắc chắn muốn xóa khách hàng {customerItem !== undefined ? customerItem.name : null} ?</p>
                </Modal>
            </div>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16 }}>
                    <p style={{ marginTop: 15, marginBottom: 8 }}><NavLink to='/admin/customers'><LeftOutlined /> Danh sách khách hàng</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 30 }}>
                        {customerItem !== undefined ? customerItem.name : null}
                    </span>
                    <div style={{ float: 'right' }}>
                        {props.user.role === 1 ?
                            (
                                <div style={{ display: 'inline' }}>
                                    <Button onClick={() => { history.push('/admin/maintenanceCards/create') }} style={{ height: 37 }} type="primary" onClick={createMaintenanceCardWithCustomer} >
                                        <span>Tạo phiếu sửa</span>
                                    </Button>
                                </div>
                            ) : <></>}

                        {/* <div style={{ display: 'inline', marginLeft: 5 }}>
                            <Button style={{ height: 37 }}><QuestionCircleOutlined />Trợ giúp</Button>
                        </div> */}
                    </div>
                </div>
                <div style={{ marginBottom: 16, width: '100%' }}>
                    <Card title={renderTitleCard()} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                        {renderBodyCard()}
                    </Card>
                </div>

                {/* lịch sử phiếu sửa xe của khách hàng */}
                <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                    <Card bordered={true} style={{ width: '100%', borderRadius: 3 }}>

                        <Tabs defaultActiveKey="1" onChange={callback()}>
                            <TabPane tab="Lịch sử sửa xe" key="1">
                                {/* <Card title={renderTitleWarrantyCard()} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                    {renderBodyCard()}
                                </Card> */}

                                {/* <Table locale={{ emptyText: <Empty description='Không có dữ liệu' image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}} columns={columns} dataSource={data} /> */}
                                <MaintenanceCard id={props.match.params.id} />
                            </TabPane>
                            {/* <TabPane tab="Lịch sử thanh toán" key="2">
                                <PaymentHistories id={props.match.params.id} />
                            </TabPane> */}
                            {/* <TabPane tab="Ghi chú" key="3">
                                Ghi chú
                        </TabPane> */}
                        </Tabs>
                    </Card>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        customerItem: state.customerReducer.customerItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch),
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CustomerInfo));