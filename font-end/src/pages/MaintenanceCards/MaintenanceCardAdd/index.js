import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, PageHeader, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
import CustomerContainer from '../../../container/MaintenanceCardAdd/CustomerContainer';
import WarrantyCardInfo from '../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer';
import ProductContainer from '../../../container/MaintenanceCardAdd/ProductContainer';
import history from '../../../history'
import { AddOutlined } from '@material-ui/icons';
import EmployeeContainer from "../../../container/MaintenanceCardAdd/EmployeeContainer";
import ServiceContainer from "../../../container/MaintenanceCardAdd/ServicesContainer/index";

const AddMaintenanceCards = (props) => {
    const [loading,setLoading] = useState(true);
 
    useEffect(()=>{
        setLoading(props.maintenanceCardAdd.check);
    },[props.maintenanceCardAdd.check])
    useEffect(() => {
        const { maintenanceCardAddActionCreators } = props;
        const { actResetStore } = maintenanceCardAddActionCreators;
        actResetStore()
    }, []);

    useEffect(() => {
        if (!props.maintenanceCardAdd.check) {
            if (props.maintenanceCardAdd.id !== 0) {
                history.push("/admin/maintenanceCards/" + props.maintenanceCardAdd.id)
            }
        }
    }, [props.maintenanceCardAdd.id, props.maintenanceCardAdd.check]);

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
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/maintenanceCards'><LeftOutlined /> Danh sách phiếu sửa chữa</NavLink></p>
                    {/* <span style={{ fontWeight: 'bold', fontSize: 35 }}> */}
                        <h1>Tạo phiếu sửa chữa</h1>
                    {/* </span> */}

                </div>
                <Divider orientation="right"> 
            <div style={{ float: 'right' }}>
                <div  style={{ display: 'inline' }}>
                    <Button   prefix={<AddOutlined/>} style={{ height: 37 }} type="primary" form="maintenanceCardInfo" key="submit" htmlType="submit" >
                        <span>Tạo phiếu sửa chữa</span>
                    </Button>
                </div>
            </div></Divider>
                <Row>
                    <Col span={18}>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin khách hàng")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <CustomerContainer close={true} />
                            </Card>
                        </div>
                         {/* EmployeeContainer */}

                        <Card style={{ marginBottom: 16, width: '100%' }} title="Nhân viên sửa chữa">
                            <EmployeeContainer/>
                        </Card>

                        {/* EmployeeContainer */}
                        {/* ServiceContainer */}
                        <Card style={{ marginBottom: 16, width: '100%' }} title="Thông tin dịch vụ">
                            <ServiceContainer/>
                        </Card>

                        {/* ServiceContainer */}
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin sản phẩm")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <ProductContainer />
                            </Card>

                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ marginBottom: 16, width: '100%', paddingLeft: '5%' }}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true} style={{ width: '100%', borderRadius: 3, border: 'none' }}>
                                <WarrantyCardInfo />
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


export default connect(mapStateToProps, mapDispatchToProps)(AddMaintenanceCards);