import React, { useEffect, useState } from 'react';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import {Table, Button, Select, Pagination, Tag, Tabs, Card, Row, Col, Modal, Spin} from 'antd';
import Search from 'antd/lib/input/Search';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaintenanceCardActions from '../../../actions/MaintenanceCard';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd';
import { formatDate } from '../../../utils/DateFormat'
import history from '../../../history'
import { formatMonney } from '../../../utils/MonneyFormat'
import { formatPlate } from '../../../utils/PlatesNumberFormat'
import BtnMaterial from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { green, purple, red, yellow, orange,blue,amber, } from '@material-ui/core/colors';
import { CloseOutlined, DeleteOutline } from '@material-ui/icons';
import Brightness1RoundedIcon from '@material-ui/icons/Brightness1Rounded';
import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import DeleteIcon from '@material-ui/icons/Delete';
import './table.css'
import { SyncOutlined } from '@ant-design/icons';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
const columns = [
    {
        title: 'Mã phiếu',
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        render: (text, data) => {
            return (<div className="link"> <NavLink to={`/admin/maintenanceCards/${data.id}`}>{text.toUpperCase()}</NavLink></div>)
        },
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
        render: (customer) => {
            return (<div>{customer.name}</div>)
        },
    },
    {
        title: 'Biển số xe',
        dataIndex: 'platesNumber',
        key: 'platesNumber',
        render: (platesNumber) => {
            return (<div>{formatPlate(platesNumber)}</div>)
        }
    },
    {
        title: 'NV điều phối',
        dataIndex: 'coordinator',
        key: 'coordinator',
        render: (coordinator) => {
            return (<div>{coordinator.fullName}</div>)
        }
    },
    {
        title: 'NV sửa chữa',
        dataIndex: 'repairman',
        key: 'repairman',
        render: (repairman) => {
            if (repairman !== null) {
                return (<div>{repairman.fullName}</div>)
            }
            return <></>
        }
    },
    {
        title: 'Trạng thái thanh toán',
        dataIndex: 'payStatus',
        key: 'payStatus',
        sorter: true,
        filters: [
            { text: 'Chưa thanh toán', value: '0' },
            { text: 'Đã thanh toán', value: '1' },
            { text: 'Đang nợ', value: '2' },
        ],
        render: (status) => {
            if (status === 0) {
                return <> <SyncOutlined style={{color:'blue',fontSize:'21px',marginLeft: '51px'}} spin={true} /></>
            }else if(status === 2) {
                return <> <Brightness2RoundedIcon style={{color:'#eb9a20',fontSize:'30px',marginLeft: '45px'}} /></>
            }
           
            else {
                return <><Brightness1RoundedIcon style={{color:'#52c41a',fontSize:'25px',marginLeft:'48px'}}/></>
            }
        }
    },
    {
        title: 'Trạng thái công việc',
        dataIndex: 'workStatus',
        key: 'workStatus',
        sorter: true,
        filters: [
            { text: 'Đang chờ', value: '0' },
            { text: 'Đang sửa', value: '1' },
            { text: 'Hoàn thành', value: '2' },
        ],
        render: (status) => {
            if (status === 0) {
                return <Tag color='warning'>Đang chờ</Tag>
            }
            else if (status === 1) {
                return <Tag color='processing'>Đang sửa</Tag>
            }
            else {
                return <Tag color='success'>Hoàn thành</Tag>
            }
        }
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'price',
        key: 'price',
        sorter: true,
        render: (price) => {
            return (
                <span>{formatMonney(price)} đ</span>
            )
        }
    },
    {
        title: 'Ngày trả xe',
        dataIndex: 'returnDate',
        key: 'returnDate',
        sorter: true,
        render: (text, data) => {
            if (data !== null) {
                return (
                    <span>{formatDate(data.returnDate)}</span>
                )
            }
            return (
                <></>
            )
        }
    }

];

const { Option } = Select;

const MaintenanceCardWorking = (props) => {


    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState('');
    const [nameField, setNameField] = useState();
    const [order, setOrder] = useState();
    const [current, setCurrent] = useState(1);
    const [filter, setFilter] = useState({});
    const [click,setClick] = useState(false);
    const { maintenanceCardActionCreators } = props;
    const { actFetchListMaintenanceCard } = maintenanceCardActionCreators;
    const { listMaintenanceCard, totalMaintenanceCard } = props;
    const [active, setActive] = useState(0);
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [visibleComplete,setVisibleComplete] = useState(false);


    const ColorButtonYellow = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(orange[500]),
            backgroundColor: orange[500],
            '&:hover': {
                backgroundColor: orange[1000],
            },
        },
    }))(BtnMaterial);
    const ColorButtonBlack = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(amber[500]),
            backgroundColor: amber[500],
            '&:hover': {
                backgroundColor: amber[1000],
            },
        },
    }))(BtnMaterial);


    const ColorButtonSuccess = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
    }))(BtnMaterial);

    const ColorButtonDangerous = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            '&:hover': {
                backgroundColor: red[700],
            },
        },
    }))(BtnMaterial);

    const ColorButtonPrimary = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(blue[500]),
            backgroundColor: blue[500],
            '&:hover': {
                backgroundColor: blue[700],
            },
        },
    }))(BtnMaterial);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    useEffect(() => {
        if ([props.active === 1]) {
            console.log("MaintenanceCardWorking", active);
            if (search === null && search.length === 0) {
                let working = { workStatus: [0, 1], payStatus: [0, 1,2] };

                actFetchListMaintenanceCard('', pageNumber, size, order, working)
            } else {

                actFetchListMaintenanceCard(search, pageNumber, size, nameField, order, filter)
            }
        }

    }, [actFetchListMaintenanceCard, search, pageNumber, size, nameField, order, filter, props.maintenanceCardAdd.reset, visible]);

    const mapMaintenanceCard = () => {
        let data = [];
        let expired = [];
        let temp = [];
        let now = new Date();
        let ws = 0;
        if (listMaintenanceCard !== undefined) {
            if(click){
            
                temp=  listMaintenanceCard.filter((maintenanceCard)=>{
                    let returnDate = new Date(maintenanceCard.returnDate);
                    let isExpired =now > returnDate;
                    let returned = maintenanceCard.returned;
                    console.log(returned);
                    if(maintenanceCard.workStatus <2 && returned === false){
                       return  {
                            key: maintenanceCard.id,
                            workStatus: ws,
                            isExpired:isExpired,
                            ...maintenanceCard,
        
                        }
                         
                    }
                })
                expired = temp.map((maintenanceCard) =>{
                    let returnDate = new Date(maintenanceCard.returnDate);
                    let isExpired =now > returnDate;
                    return  {
                        key: maintenanceCard.id,
                        workStatus: ws,
                        isExpired:isExpired,
                        ...maintenanceCard,
    
                    }
                })
            }else{
                data = listMaintenanceCard.map((maintenanceCard, _index) => {
                    let returnDate = new Date(maintenanceCard.returnDate);
                    let isExpired =now > returnDate;
                    return {
                        key: maintenanceCard.id,
                        workStatus: ws,
                        isExpired:isExpired,
                        ...maintenanceCard,
    
                    }
                })
            }
        }
    
        if(click){
            return expired;
        }else{
            return data;
        }
    }

    const handleTableChange = (_pagination, _filters, sorter) => {

        if (sorter && sorter !== undefined) {
            setNameField(sorter.field)
            setOrder(sorter.order)
            setFilter(_filters)
        }
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    };

    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [],
        loading: false,
    });

    const onSelectChange = selectedRowKeys => {
        setStateLoadding({ selectedRowKeys });
    };

    const rowSelection = {
        selectedRowKeys: stateLoadding.selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = stateLoadding.selectedRowKeys.length > 0;

    const onChange = (pageNumber) => {
        setCurrent(pageNumber)
        setPageNumber(pageNumber)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }

    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }

    const handleCancel = (_e) => {
        setSearch('')
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }

    const searchMaintenanceCard = (value) => {
        setSearch(value)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }

    const completeCard = () => {
        const { maintenanceCardAddActionCreator } = props
        const { actCompleteCard } = maintenanceCardAddActionCreator;
        actCompleteCard(stateLoadding.selectedRowKeys)
    }
 
    const filterMaintenanceCard = (value) => {
        setFilter(value);
        setPageNumber(1);
    }
    let working = { workStatus: [0, 1], payStatus: [0, 1,2] };
    let finshed = { workStatus: [2], payStatus: [1] };
    let waitPay = { workStatus: [2], payStatus: [0] };
    let debt = { workStatus: [2], payStatus: [2] };
    const [checkStrictly] = React.useState(false);
    const showClear = () => {
        setVisible(true);
    }
    const handleChangeFilter = () => {
        setVisible(!visible);
        setFilter({ undefined })
    }
    const handleCancelFinish = (e) =>{

        setVisibleComplete(!visibleComplete);
    }
    const open =()=>{
        setVisibleComplete(!visibleComplete);
    }
    const handleOKFinish = (e) =>{

        setVisibleComplete(!visibleComplete)
        completeCard();
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
            <Card title="Danh sách phiếu sửa chữa">

                <div style={{ marginTop: 5 }}>
                    <Row>
                        {/* <Col span={4}>
                
                    </Col> */}
                        <Col span={16}>
                            <div style={{ float: 'left' }}>
                                <ColorButtonPrimary style={{ fontSize: 'small', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
                                    variant="contained"
                                    color="inherit"
                                    className={classes.button}
                                    onClick={() => {
                                        filterMaintenanceCard(waitPay)
                                        showClear()
                                        setClick(false)
                                    }}
                                > Chờ thanh toán</ColorButtonPrimary>
                                <ColorButtonYellow style={{ fontSize: 'small', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
                                    variant="contained"
                                    color="inherit"
                                    className={classes.button}
                                    onClick={() => {
                                        filterMaintenanceCard(working);
                                        showClear()
                                        setClick(false)
                                    }}

                                >Đang sửa</ColorButtonYellow>


                                <ColorButtonDangerous style={{ fontSize: 'small', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
                                    variant="contained"
                                    color="inherit"
                                    className={classes.button}
                                    onClick={() =>{setClick(!click)
                                        showClear();
                                         
                                    }
                                                    
                                }
                                >Quá hạn</ColorButtonDangerous>

                                <ColorButtonSuccess style={{ fontSize: 'small', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
                                    variant="contained"
                                    color="inherit"
                                    className={classes.button}
                                    onClick={() => {
                                        filterMaintenanceCard(finshed)
                                        showClear()
                                        setClick(false)
                                    }}
                                >Đã hoàn thành</ColorButtonSuccess>

                                <ColorButtonBlack style={{ fontSize: 'small', color: 'white', borderRadius: '20px', fontWeight: 'bold',backgroundColor:'black' }}
                                                    variant="contained"
                                                    color="inherit"
                                                    className={classes.button}
                                                    onClick={() => {
                                                        filterMaintenanceCard(debt)
                                                        showClear()
                                                        setClick(false)
                                                    }}
                                >Đang nợ</ColorButtonBlack>


                                {visible ? <><span><DeleteIcon style={{marginLeft:'10px', fontSize: 30,color:'red' }} onClick={() => { handleChangeFilter()
                                                                                    setClick(false); }}   /></span></> : <></>}
                            </div>

                        </Col>
                        <Col span={8}>

                            <div style={{ float: 'right' }}>
                                <Search
                                    placeholder="Tìm theo mã hoặc sđt"
                                    onSearch={searchMaintenanceCard}
                                    
                                    style={{ width: 300, marginTop: 5, marginRight: 10,height: '37px' }}
                                    onChange={handleChangeSearch}
                                    value={search}
                                    allowClear={true}
                                />
                                {props.user.role !== 2 ? (
                                    <div style={{ display: 'inline' }}>
                                        <ColorButtonSuccess  onClick={() => history.push(`/admin/maintenanceCards/create`)}>
                                            <span style={{ color: "white",fontSize: 'small',fontWeight:'bold' }}>Thêm mới phiếu</span>
                                        </ColorButtonSuccess>
                                    </div>
                                ) : <></>}

                            </div>

                        </Col>
                    </Row>

                </div>

                <div style={{ marginBottom: 16 }}>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} phiếu     ` : ''}
                    </span>
                    <div style={{ display: 'inline', marginTop: 15 }}>
                        {hasSelected ? <Button type="primary" onClick={ open}  >Hoàn thành phiếu</Button> : <></>}
                    </div>
                </div>

                <Table style={{ paddingTop: 10 }}
                    columns={columns}
                    rowSelection={{ ...rowSelection, checkStrictly }}
                    dataSource={mapMaintenanceCard()}
                    showSorterTooltip={false}
                    rowClassName={(data,index) => data.isExpired && data.returned == false && data.workStatus != 2 ? 'table-expried' :'.ant-table-row ant-table-row-level-0'}
                    // rowKey={record => record.login.uuid}
                    
                    pagination={false}
                    onChange={handleTableChange}
                    locale={{
                        filterConfirm: 'Tìm kiếm',
                        filterReset: 'Đặt lại',
                        emptyText: "Không có phiếu sửa chữa nào",
                        triggerDesc: 'Sắp xếp giảm dần',
                        triggerAsc: 'Sắp xếp giảm dần',
                        cancelSort: 'Hủy sắp xếp',
                    }}

                    onRow={(r) => ({
                        onClick: () => {
                            history.push(`/admin/maintenanceCards/${r.id}`)
                        },

                    })}
                />
                <div style={{ float: 'right', marginTop: 10 }}>
                    <Pagination current={current} total={totalMaintenanceCard} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]}
                        onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
                </div>
            </Card>


        </>
    );
}

const mapStateToProps = state => {

    return {
        listMaintenanceCard: state.maintenanceCard.maintenanceCards,
        totalMaintenanceCard: state.maintenanceCard.totalItems,
        maintenanceCardAdd: state.maintenanceCardAdd,
        user: state.userReducer,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        maintenanceCardActionCreators: bindActionCreators(MaintenanceCardActions, dispatch),
        maintenanceCardAddActionCreator: bindActionCreators(maintenanceCardAddActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCardWorking);