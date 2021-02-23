import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select, Card, Tabs, Modal, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as couponActions from '../../actions/coupon';
import * as maintenanceCardAddActions from '../../actions/maintenanceCardAdd';
import history from '../../history';
import { formatDate } from '../../utils/DateFormat';
import { formatMonney } from '../../utils/MonneyFormat';
//import moment from 'moment';

const CouponInfo = (props) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { couponActionCreators } = props;
    const { actGetItemCoupon, actUpdateCoupon } = couponActionCreators;
    const { couponItem } = props;

    useEffect(() => {
        actGetItemCoupon(props.match.params.id)
    }, [actGetItemCoupon, props.match.params.id]);

    const { Option } = Select;

    const { TabPane } = Tabs;

    const handleChange = (value) => {
     
        if (value === 'delete') {
 
            setVisible(true)

        }
        if (value === 'update') {
            history.push(`/admin/coupons/update/${props.match.params.id}`)
        }
    }

    const renderTitleCard = () => {
        return (
            <>
                <Row>
                    <Col span={8}>Thông tin chi tiết phiếu giảm giá</Col>
                    <Col span={8}><span style={{ marginLeft: 87 }}>{couponItem !== undefined ? couponItem.status === "0" ? <Tag color='success'>Đã xóa </Tag> : <Tag color='warning'> Đang tồn tại</Tag> : ''} </span></Col>
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
            actUpdateCoupon([props.match.params.id]);
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
                            <Col span={8}>Mã phiếu</Col>
                            <Col span={16}>: {couponItem !== undefined ? couponItem.code : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Tên phiếu</Col>
                            <Col span={16}>: {couponItem !== undefined ? couponItem.name : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Ngày hết hạn</Col>
                            <Col span={16}>: {couponItem !== undefined ? formatDate(couponItem.expiredDate) : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8} style={{marginLeft: -23}}>                        
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={8}>Ngày tạo</Col>
                            <Col span={16}>: {couponItem !== undefined ? formatDate(couponItem.createdDate) : null}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={8}>Ngày sửa</Col>
                            <Col span={16}>: {couponItem !== undefined ? formatDate(couponItem.modifiedDate) : null}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Mô tả</Col>
                            <Col span={19}>: {couponItem !== undefined ? couponItem.description : null }</Col>
                        </Row>
                        {/* <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Mô tả</Col>
                            <Col span={19}>: {customerItem !== undefined ? customerItem.description !== null ? customerItem.description : '--' : null}</Col>
                        </Row> */}
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Quantity </Col>
                            <Col span={19}>
                                : {couponItem !== undefined ? couponItem.quantity : null}
                                {/* - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null ? customerItem.ward.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null ? customerItem.ward.district.name : null}
                                - {customerItem !== undefined && customerItem.ward !== undefined && customerItem.ward !== null && customerItem.ward.district !== null && customerItem.ward.district.province !== null ? customerItem.ward.district.province.name : null} */}
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
                    title="Xóa phiếu"
                    onCancel={handleCancel}
                    onOk={handleOk}
                    cancelText={"Thoát"}
                    okText={"Xóa"}
                    confirmLoading={confirmLoading}
                >
                    <p>Bạn có chắc chắn muốn xóa phiếu {couponItem !== undefined ? couponItem.name : null} ?</p>
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
        couponItem: state.couponReducer.couponItem,
        totalElement: state.couponReducer.totalElement,
        totalPage: state.couponReducer.totalPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        couponActionCreators: bindActionCreators(couponActions, dispatch),
        // maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CouponInfo));