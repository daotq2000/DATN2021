import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select, Card, Tabs, Modal, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as serviceActions from '../../actions/service';
import * as maintenanceCardAddActions from '../../actions/maintenanceCardAdd';
import history from '../../history';
import { formatDate } from '../../utils/DateFormat';
import { formatMonney } from '../../utils/MonneyFormat';
//import moment from 'moment';

const ServiceInfo = (props) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { serviceActionCreators } = props;
    const { actGetItemService, actUpdateService } = serviceActionCreators;
    const { serviceItem } = props;

    useEffect(() => {
        actGetItemService(props.match.params.id)
    }, [actGetItemService, props.match.params.id]);

    const { Option } = Select;

    const { TabPane } = Tabs;

    const handleChange = (value) => {
     
        if (value === 'delete') {
 
            setVisible(true)

        }
        if (value === 'update') {
            history.push(`/admin/services/update/${props.match.params.id}`)
        }
    }

    const renderTitleCard = () => {
        return (
            <>
                <Row>
                    <Col span={8}>Thông tin dịch vụ</Col>
                    <Col span={8}><span style={{ marginLeft: 87 }}>{serviceItem !== undefined ? serviceItem.status === "0" ? <Tag color='success'>Đã ngừng cung cấp dịch vụ</Tag> : <Tag color='warning'> Đang cung cấp dịch vụ</Tag> : ''} </span></Col>
                    <Col span={8}>
                        <Select value="Chọn chức năng" style={{ float: 'right', width: '40%' }} onChange={handleChange} >
                            <Option value="update">Cập nhật thông tin</Option>
                            
                        </Select>                                                                  
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
            actUpdateService([props.match.params.id]);
            // history.push(`/admin/customers`)
        }, 500);
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const renderBodyCard = () => {

        return (
            <>
                <Row style={{}}>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6 }}>
                            <Col span={8}>Mã dịch vụ</Col>
                            <Col span={16}>: {serviceItem !== undefined ? serviceItem.code : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Tên dịch vụ</Col>
                            <Col span={16}>: {serviceItem !== undefined ? serviceItem.name : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Giá</Col>
                            <Col span={16}>: {serviceItem !== undefined ? serviceItem.price : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8} style={{marginLeft: -23}}>                        
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Ngày tạo</Col>
                            <Col span={16}>: {serviceItem !== undefined ? formatDate(serviceItem.createdDate) : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Ngày sửa</Col>
                            <Col span={16}>: {serviceItem !== undefined ? formatDate(serviceItem.modifiedDate) : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Mô tả</Col>
                            <Col span={19}>: {serviceItem !== undefined ? serviceItem.description : null }</Col>
                        </Row>
                        {/* <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Mô tả</Col>
                            <Col span={19}>: {customerItem !== undefined ? customerItem.description !== null ? customerItem.description : '--' : null}</Col>
                        </Row> */}
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Thời gian hoàn thành </Col>
                            <Col span={19}>
                                : {serviceItem !== undefined ? serviceItem.time : null}
                                {/* - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null ? customerItem.ward.district.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null && customerItem.ward.district.province !== null ? customerItem.ward.district.province.name : null} */}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Thời gian bảo hành </Col>
                            <Col span={19}>
                                : {serviceItem !== undefined ? serviceItem.timeGuarantee : null}                              
                            </Col>
                        </Row>
                    </Col>                   
                </Row>
            </>
        )
    }
    return (
        <>
            <div>
                <Modal
                    visible={visible}
                    title="Xóa dịch vụ"
                    onCancel={handleCancel}
                    onOk={handleOk}
                    cancelText={"Thoát"}
                    okText={"Xóa"}
                    confirmLoading={confirmLoading}
                >
                    <p>Bạn có chắc chắn muốn xóa dịch vụ {serviceItem !== undefined ? serviceItem.name : null} ?</p>
                </Modal>
             </div>
             <div style={{ marginBottom: 16, width: '100%' }}>
                    <Card title={renderTitleCard()} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                        {renderBodyCard()}
                    </Card>
                </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        serviceItem: state.serviceReducer.serviceItem,
        totalElement: state.serviceReducer.totalElement,
        totalPage: state.serviceReducer.totalPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        serviceActionCreators: bindActionCreators(serviceActions, dispatch),
        // maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ServiceInfo));