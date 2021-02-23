import React, {useEffect, useRef, useState} from 'react';
import {Button, Row, Col, Card, Tag, Divider, Spin} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import CustomerContainer from '../../../container/MaintenanceCardAdd/CustomerContainer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
import ProductContainer from '../../../container/MaintenanceCardAdd/ProductContainer';
import PaymentHistoryContainer from '../../../container/MaintenanceCardAdd/PaymentHistoryContainer';
import MaintenanceCardInfoContainer from '../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer';
import StatusHistoryContainer from '../../../container/MaintenanceCardAdd/StatusHistoryContainer';
import Modal from 'antd/lib/modal/Modal';
import EmployeeContainer from "../../../container/MaintenanceCardAdd/EmployeeContainer";
import ServiceContainer from "../../../container/MaintenanceCardAdd/ServicesContainer";
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint, {useReactToPrint} from 'react-to-print'
import {ComponentToPrint} from "./ComponentToPrint";
import Info2 from "../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer/index2"
import Info from './info'
import {withStyles} from "@material-ui/core/styles";
import {orange, red} from "@material-ui/core/colors";
import BtnMaterial from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {message} from 'antd'
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const MaintenanceCardEdit = (props) => {
    const componentRef = useRef();
    const [visiblePopupDelete,setVisiblePopupDelete] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [refesh, setRefesh] = useState(false);
    const [visibleComplete,setVisibleComplete] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const ColorButtonYellow = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(orange[500]),
            backgroundColor: orange[500],
            '&:hover': {
                backgroundColor: orange[1000],
            },
        },
    }))(BtnMaterial);
    useEffect(() => {
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchMaintenanceCardById} = maintenanceCardAddActionCreators;
        actFetchMaintenanceCardById(props.match.params.id)
    }, [props.maintenanceCardAdd.reset]);

    const [returnDate, setReturnDate] = useState(null);

    useEffect(() => {
        setReturnDate(props.maintenanceCardAdd.info.returnDate)
    }, [props.maintenanceCardAdd.info.returnDate]);

    const renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
    }




    const handleOk = e => {
        if(props.maintenanceCardAdd.commentDelete != null){
            const {maintenanceCardAddActionCreators} = props;
            const {actDeleteMaintenanceCard} = maintenanceCardAddActionCreators;
            actDeleteMaintenanceCard(props.match.params.id)
        }else{
            message.info("Vui lòng giải thích lý do hủy phiếu tại phần mô tả")
        }


    };
    const handleCancel = e => {
        console.log(e);
        setVisiblePopupDelete(false);
    };
    const handleCancelFinish = (e) =>{

        setVisibleComplete(!visibleComplete);
    }
    const handleOpen = (e) =>{
        setVisibleComplete(!visibleComplete)
    }
    const handleOKFinish = (e) =>{
        // completeCard();
        const {maintenanceCardAddActionCreators} = props
        const {actCompleteCard} = maintenanceCardAddActionCreators;
        let maintenanceCardId = [];
        maintenanceCardId.push(props.match.params.id)
        actCompleteCard(maintenanceCardId)
        setVisibleComplete(!visibleComplete)
    }
    return (
        <>
            <Modal
                title="Xác nhận hoàn thành "
                visible={visibleComplete}
                onOk={handleOKFinish}
                onCancel={handleCancelFinish}
                okText='Hoàn thành'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={false} delay={500}>
                    Bạn có chắc chắn muốn hoàn thành tất cả dịch vụ?
                </Spin>
            </Modal>
            <Modal
                title="Xác nhận xóa "
                visible={visiblePopupDelete}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Đồng ý'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={false} delay={500}>
                    Bạn có chắc chắn muốn huỷ phiếu này?
                </Spin>
            </Modal>

            <div style={{width: '98%', marginRight: '1%', marginLeft: '1%'}}>
                <div style={{marginBottom: 16, marginTop: 30}}>
                    <p><NavLink to='/admin/maintenanceCards'><LeftOutlined/> Danh sách phiếu sửa chữa</NavLink></p>
                    <span style={{fontWeight: 'bold', fontSize: 35}}>
                       Thông tin phiếu sửa chữa
                </span>
                    <div style={{float: 'right'}}>

                        <div style={{display: 'inline'}}>
                            {(props.maintenanceCardAdd.returned != true &&props.maintenanceCardAdd.workStatus ==0 && props.maintenanceCardAdd.payStatus == 0 && props.user.role != 2) ?
                                <Button type="primary"  onClick={()=>{
                                    setVisiblePopupDelete(true);

                                }} style={{height: 37,backgroundColor:'rgb(247 192 202 / 78%)',fontWeight:600,border: 'none'}} variant="contained" color="secondary">
                                    <DeleteIcon style={{color:'red',fontSize:'30px'}} />  <span style={{color:'black'}}>Hủy phiếu</span>
                                </Button>: <></>
                            }

                            {(props.maintenanceCardAdd.info.returned) && props.maintenanceCardAdd.workStatus == 2 ? <>
                                    <Tag color="success"
                                         style={{fontSize: 'medium', width: '160px', height: '40px', lineHeight: '37px'}}>Phiếu
                                        đã hoàn thành</Tag>

                                </>
                                : <>{props.user.role != 2? <><Button onClick={() => {
                                    setRefesh(!refesh)
                                }} style={{height: 37,marginLeft: '20px'}} type="primary" form="maintenanceCardInfo" key="submit"
                                                                     htmlType="submit">
                                    <span>Cập nhật</span>
                                </Button></>:<></>}</>}


                            {props.maintenanceCardAdd.workStatus !== 2 ? <>
                                    <Button onClick={() => {
                                        setRefesh(!refesh)
                                    }} style={{height: 37, marginLeft: '20px'}} type="primary" onClick={handleOpen}>
                                        <span>Hoàn thành phiếu</span>
                                    </Button>
                                </>
                                : ""}
                            {props.maintenanceCardAdd.payStatus ==1 && props.maintenanceCardAdd.workStatus ==2 ? <>                            <Button
                                onClick={handlePrint} style={{background: '#f0f2f5', border: 'none'}}><PrintIcon
                                style={{color: 'rgb(17, 82, 147)', fontSize: '42px', marginLeft: '15px'}}/></Button>
                            </> : <></>}
                            <div style={{display: 'none'}}>
                                <Example  ref={componentRef}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={18}>
                        <div style={{marginBottom: 16, width: '100%'}}>
                            <Card title={renderTitleCard("Thông tin khách hàng")} bordered={false}
                                  style={{width: '100%', borderRadius: 3}}>
                                <CustomerContainer close={false}/>
                            </Card>
                        </div>
                        <div style={{marginBottom: 16, width: '100%'}}>
                            <Card title={renderTitleCard("Thông tin nhân viên")} bordered={false}
                                  style={{width: '100%', borderRadius: 3}}>
                                <EmployeeContainer maintenanceCardId={props.match.params.id} close={false}/>
                            </Card>
                        </div>
                        <div style={{marginBottom: 16, width: '100%'}}>
                            <Card title={renderTitleCard("Thông tin dịch vụ")} bordered={false}
                                  style={{width: '100%', borderRadius: 3}}>
                                <ServiceContainer/>
                            </Card>
                        </div>
                        <div style={{marginBottom: 16, width: '100%'}}>
                            <Card title={renderTitleCard("Thông tin sản phẩm")} bordered={false}
                                  style={{width: '100%', borderRadius: 3}}>
                                <ProductContainer/>
                            </Card>
                        </div>
                        <div style={{marginBottom: 16, width: '100%', marginTop: 20}}>
                            <PaymentHistoryContainer/>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{marginBottom: 16, width: '100%', paddingLeft: '5%'}}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true}
                                  style={{width: '100%', borderRadius: 3, border: 'none'}}>
                                <MaintenanceCardInfoContainer refesh={refesh} idParam={props.match.params.id}/>
                            </Card>
                        </div>
                        <div style={{marginBottom: 16, width: '100%', paddingLeft: '5%'}}>
                            <Card title={renderTitleCard("Lịch sử thay đổi trạng thái dịch vụ")} bordered={true}
                                  style={{width: '100%', borderRadius: 3, border: 'none'}}>
                                <StatusHistoryContainer/>
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
        reset: state.maintenanceCardAdd.reset,
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}

class Example extends React.Component {

    constructor(props) {
        super(props);
    }
    renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
    }

    render() {
        return (
            <Row>
                <Col span={18}>
                    <div style={{marginBottom: 16, width: '100%'}}>
                        <Card title={this.renderTitleCard("Thông tin khách hàng")} bordered={false}
                              style={{width: '100%', borderRadius: 3}}>
                            <CustomerContainer />
                        </Card>
                    </div>
                    <div style={{marginBottom: 16, width: '100%'}}>
                        <Card title={this.renderTitleCard("Thông tin nhân viên")} bordered={false}
                              style={{width: '100%', borderRadius: 3}}>
                            <EmployeeContainer />
                        </Card>
                    </div>
                    <div style={{marginBottom: 16, width: '100%'}}>
                        <Card title={this.renderTitleCard("Thông tin dịch vụ")} bordered={false}
                              style={{width: '100%', borderRadius: 3}}>
                            <ServiceContainer/>
                        </Card>
                    </div>
                    <div style={{marginBottom: 16, width: '100%'}}>
                        <Card title={this.renderTitleCard("Thông tin sản phẩm")} bordered={false}
                              style={{width: '100%', borderRadius: 3}}>
                            <ProductContainer/>
                        </Card>
                    </div>
                    <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                        <PaymentHistoryContainer />
                    </div>
                </Col>
                <Col span={6}>
                    <div style={{marginBottom: 16, width: '100%', paddingLeft: '5%'}}>
                        <Card title={this.renderTitleCard("Thông tin đơn hàng")} bordered={true}
                              style={{width: '100%', borderRadius: 3, border: 'none'}}>
                            <Info2  />
                        </Card>
                    </div>
                    {/*<div style={{marginBottom: 16, width: '100%', paddingLeft: '5%'}}>*/}
                    {/*    <Card title={this.renderTitleCard("Lịch sử thanh toán")} bordered={true}*/}
                    {/*          style={{width: '100%', borderRadius: 3, border: 'none'}}>*/}
                    {/*        <PaymentHistoryContainer/>*/}
                    {/*    </Card>*/}
                    {/*</div>*/}
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCardEdit);

