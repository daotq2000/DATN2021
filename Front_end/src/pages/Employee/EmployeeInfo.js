import React, { useEffect } from 'react';
import { Button, Row, Col, Select, Card, Tabs, Table } from 'antd';
import { LeftOutlined, QuestionCircleOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { NavLink, useParams ,useHistory} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as employeeActions from '../../actions/employee';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Badge, Divider } from 'antd';


const columns = [
    { title: 'Mã Phiếu', dataIndex: 'code', key: 'code' },
    { title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName', render: (text, data) => <NavLink to={`../../admin/customers/${data.customerId}`}>{text}</NavLink> },
    { title: 'Biển số', dataIndex: 'platesNumber', key: 'platesNumber' },
    { title: 'Tổng tiền', dataIndex: 'price', key: 'price' },
    { title: 'Màu xe', dataIndex: 'color', key: 'color' },
    { title: 'NV điều phối', dataIndex: 'cordinatorName', key: 'cordinatorName' },
    { title: 'Trạng thái', dataIndex: 'payStatus', key: 'payStatus'  },
];

const EmployeeInfo = (props) => {
    console.log(props);
    const id = useParams().id;
    const history = useHistory();
    const { Option } = Select;
    const { employeeActionsCreator } = props;
    const { actGetEmployee } = employeeActionsCreator;
    const {actDeleteEmployee} = employeeActionsCreator;
    const {actgetMaintenanceCardByUserId} = employeeActionsCreator;
    const { TabPane } = Tabs;
    const { userItem } = props;
 
    const {maintenanceCard,totalPage,totalElement,currentPage} = props;
    useEffect(() => {
        if (id != undefined || id != null) {
            actGetEmployee(1,5,'','','');
          
        }
    }, [actGetEmployee,actgetMaintenanceCardByUserId])
    const handleChangeOption = (value) => {
        console.log(value);
        if(value === 'update'){
           history.push(`../../admin/employee/update/${id}`);
        }
        if(value==='delete'){
            const arrayId = [id];
            actDeleteEmployee(arrayId);
            history.push('../../admin/employees')
        }
    }
    const renderTitleCard = () => {
        return (
            <>
                <Row>
                    <Col span={8}>Thông tin cá nhân</Col>
                    <Col span={8}>Vai trò</Col>
                    <Col span={8}>
                        <Select value="Chọn chức năng " style={{ float: 'right', width: 160 }} onChange={handleChangeOption} >
                        <Option value="update">Cập nhật thông tin</Option> 
                        <Option value="delete">Xóa khách hàng</Option>
                        </Select></Col>
                </Row>
            </>
        )
    }
    useEffect(() =>{
        actgetMaintenanceCardByUserId(id,1,5,'','','');
     
    },[])
    const mapdata = () => {
        let data = [];
        if(maintenanceCard != undefined){
           data= maintenanceCard.map((val) =>{
               console.log(val);
                return{
                    ...val,
                    customerName:val.customer.name,
                    cordinatorName:val.coordinator.fullName
                }
            })
        }
        return data;
    }
    const renderBodyCard = (props) => {
         
        return (
            <>
                <Row>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={10}>Mã nhân viên </Col>
                            <Col span={14}>: {props.code}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={10}>Tên nhân viên </Col>
                            <Col span={14}>: {props.fullName}</Col>
                        </Row>

                    </Col>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={10}>Số điện thoại :</Col>
                            <Col span={14}>: {props.phoneNumber}</Col>
                        </Row>

                        <Row style={{ marginBottom: 6 }} >
                            <Col span={10}>Email </Col>
                            <Col span={14}>: {props.email}</Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={10}>Ngày tạo </Col>
                            <Col span={14}>: {moment(props.createdDate).format('DD/MM/YYYY hh:mm')}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={10}>Ngày sửa </Col>
                            <Col span={14}>: {moment(props.modifiedDate).format('DD/MM/YYYY hh:mm ')}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 6 }} >
                    <Col span={3}>Địa chỉ </Col>
                    <Col span={21}>&ensp;&ensp;: {props.address}</Col>
                </Row>
            </>
        )
    }


    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16, marginTop: -30 }}>
                    <p><NavLink to='/admin/employees'><LeftOutlined /> Danh sách nhân viên</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Chi tiết nhân viên
                </span>
                   
                </div>

                <div style={{ marginBottom: 16, width: '100%' }}>
                    <Card title={renderTitleCard()} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                        {renderBodyCard(userItem)}
                    </Card>
                </div>

            </div>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%', marginTop: '59px' }}>
                <div style={{ marginBottom: 16, marginTop: -30 }}>

                    <h3>Thông tin phiếu đã sửa chữa</h3>
                </div>
                <Table
                    columns={columns}
                    // expandable={{
                    //     expandedRowRender: record => <p style={{ margin: 0 }}>{`${record.description} , năm sản xuất ${record.model}`}</p>,
                    //     rowExpandable: record => record.name !== 'Not Expandable',
                    // }}
                    dataSource={mapdata()}
                />
            </div>
        </>
    );
}

EmployeeInfo.propTypes = {
    createEmployee: PropTypes.shape({
        employeeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        userItem: state.employeeReducer.userItem,
        maintenanceCard:state.employeeReducer.maintenanceCard
    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo));

