import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select, Card, Tabs, Modal} from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as customerActions from '../../actions/customer';
import history from '../../history';
import MaintenanceCard from './MaintenanceCard';
import moment from 'moment';

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
                    <Col span={8}>{customerItem !== undefined ? customerItem.pay_status === "1" ? <span style={{color: 'blue'}}>Đã thanh toán</span> : customerItem.pay_status === "2" ? <span style={{color:'green'}}>Chưa tạo phiếu</span> : <span style={{color:'red'}}>Chưa thanh toán</span> : ''} </Col>
                    <Col span={8}>
                        <Select value="Chọn chức năng" style={{ float: 'right', width: 160 }} onChange={handleChange} >
                            <Option value="update">Cập nhật thông tin</Option>
                            <Option value="delete">Xóa khách hàng</Option>
                        </Select></Col>
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
            history.push(`/admin/customers`)
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const renderBodyCard = () => {
        
        return (
            <>
                <Row>
                    <Col span={11}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Mã khách hàng</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.code : null}</Col>
                        </Row>
                        {/* <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Tên khách hàng</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.name : null}</Col>
                        </Row> */}
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Số điện thoại</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.phoneNumber : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Email</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.email : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Địa chỉ </Col>
                            <Col span={16}>
                                : {customerItem !== undefined ? customerItem.address : null} - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.name : null} - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.district.name : null} - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.district.province.name : null}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}/>
                    <Col span={11}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Nợ hiện tại</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.current_debt : null} đ</Col>
                        </Row>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Ngày tạo</Col>
                            <Col span={16}>: {customerItem !== undefined ? moment(customerItem.createdDate).format('DD/MM/YYYY'): null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Ngày sửa</Col>
                            <Col span={16}>: {customerItem !== undefined ?  moment(customerItem.modifiedDate).format('DD/MM/YYYY') : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Mô tả</Col>
                            <Col span={16}>: {customerItem !== undefined ? customerItem.description : null}</Col>
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
                <div style={{ marginBottom: 16}}>
                    <p><NavLink to='/admin/customers'><LeftOutlined /> Danh sách khách hàng</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 30 }}>
                    {customerItem !== undefined ? customerItem.name : null}
                </span>
                    <div style={{ float: 'right' }}>
                        <div style={{ display: 'inline' }}>
                            <Button onClick={() => {history.push('/admin/maintenanceCards/create')}} style={{ height: 37, marginRight: 5 }} type="primary" >
                                <span>Tạo phiếu sửa</span>
                            </Button>
                        </div>
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
                                <MaintenanceCard id={props.match.params.id}/>
                            </TabPane>
                            {/* <TabPane tab="Liên hệ" key="2">
                                Liên hệ
                        </TabPane>
                            <TabPane tab="Ghi chú" key="3">
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
        customerItem: state.customerReducer.customerItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CustomerInfo));