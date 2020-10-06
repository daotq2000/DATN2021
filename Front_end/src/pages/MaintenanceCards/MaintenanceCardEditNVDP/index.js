import React, { useEffect } from 'react';
import { Button, Row, Col, Select, Card, Tabs, AutoComplete, Input, Table, Timeline, Tag } from 'antd';
import { CheckCircleOutlined, CloseOutlined, ExclamationCircleOutlined, LeftOutlined, QuestionCircleOutlined, SortAscendingOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import CustomerContainer from '../../../container/MaintenanceCardAdd/CustomerContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
import ProductContainer from '../../../container/MaintenanceCardAdd/ProductContainer';
import PaymentHistoryContainer from '../../../container/MaintenanceCardAdd/PaymentHistoryContainer';
import MaintenanceCardInfoContainer from '../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer';
import StatusHistoryContainer from '../../../container/MaintenanceCardAdd/StatusHistoryContainer';
const MaintenanceCardEdit = (props) => {

    useEffect(() => {
        const { maintenanceCardAddActionCreators } = props;
        const { actFetchMaintenanceCardById } = maintenanceCardAddActionCreators;
        actFetchMaintenanceCardById(props.match.params.id)
    }, []);

    const renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
    }


    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16, marginTop: -30 }}>
                    <p><NavLink to='/admin/customer'><LeftOutlined /> Danh sách phiếu sửa chữa</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 35 }}>
                        Phiếu sửa chữa
                </span>
                    <div style={{ float: 'right' }}>
                        <div style={{ display: 'inline' }}>
                            <Button style={{ height: 37, marginRight: 5 }} type="primary" form="maintenanceCardInfo" key="submit" htmlType="submit" >
                                <span>Cập nhật phiếu sửa chữa</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={18}>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin khách hàng")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <CustomerContainer close={false} />
                            </Card>
                        </div>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin dịch vụ")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <ProductContainer />
                            </Card>
                        </div>
                        <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                            <PaymentHistoryContainer />
                        </div>
                        <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                            <Card title={renderTitleCard("Lịch sử thay đổi trạng thái")} bordered={true} style={{ width: '100%', borderRadius: 3 }}>
                                <StatusHistoryContainer />
                            </Card>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ marginBottom: 16, width: '100%', marginLeft: '5%' }}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true} style={{ width: '100%', borderRadius: 3, border: 'none' }}>
                                <MaintenanceCardInfoContainer />
                            </Card>
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCardEdit);