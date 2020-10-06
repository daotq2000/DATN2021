import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Pagination, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaintenanceCardActions from '../../actions/MaintenanceCard';
import * as maintenanceCardAddActions from '../../actions/maintenanceCardAdd';
import {formatDate} from '../../utils/DateFormat'

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: true,
        render: (text, data) => {
            return (<NavLink to={`/admin/maintenanceCards/${data.id}`}>{text}</NavLink>)
        },
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
        render: (customer) => {
            return (<NavLink to={`/admin/customers/${customer.id}`}>{customer.name}</NavLink>)
        },
    },
    {
        title: 'Biển số xe',
        dataIndex: 'platesNumber',
        key: 'platesNumber',
    },
    {
        title: 'NV điều phối',
        dataIndex: 'coordinator',
        key: 'coordinator',
        render: (coordinator) => {
            return (<NavLink to={`/admin/users/${coordinator.id}`}>{coordinator.fullName}</NavLink>)
        }
    },
    {
        title: 'NV sửa chữa',
        dataIndex: 'repairman',
        key: 'repairman',
        render: (repairman) => {
            if (repairman !== null) {
                return (<NavLink to={`/admin/users/${repairman.id}`}>{repairman.fullName}</NavLink>)
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
        ],
        render:(status)=>{
            if(status === 0){
                return <Tag color='warning'>Chưa thanh toán</Tag>
            }
            else{
                return <Tag color='success'>Đã thanh toán</Tag>
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
        render:(status)=>{
            if(status === 0){
                return <Tag color='warning'>Đang chờ</Tag>
            }
            else  if(status === 1){
                return <Tag color='processing'>Đang sửa</Tag>
            }
            else{
                return <Tag color='success'>Hoàn thành</Tag>
            }
        }
    },
    {
        title: 'Ngày trả xe',
        dataIndex: 'returnDate',
        key: 'returnDate',
        sorter: true,
        render: (returnDate) => {
            if (returnDate !== null) {
                return (
                    <span>{formatDate(returnDate)}</span>
                )
            }
            return (
                <></>
            )
        }
    },
    {
        title: 'Giá tiền',
        dataIndex: 'price',
        key: 'price',
        sorter: true,
    },

];

const { Option } = Select;

const MaintenanceCard = (props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(3);
    const [search, setSearch] = useState('');
    const [nameField,setNameField] = useState();
    const [order,setOrder] = useState();
    const [current, setCurrent] = useState(1);
    const [filter, setFilter] = useState({});

    const { maintenanceCardActionCreators } = props;
    const { actFetchListMaintenanceCard } = maintenanceCardActionCreators;
    const { listMaintenanceCard, totalMaintenanceCard } = props;

    useEffect(() => {
        if (search === null && search.length === 0) {
            actFetchListMaintenanceCard('', pageNumber, size, order,filter)
        } else {
            actFetchListMaintenanceCard(search, pageNumber, size, nameField, order,filter)
        }
    }, [actFetchListMaintenanceCard, search, pageNumber, size, nameField, order,filter,props.maintenanceCardAdd.reset]);

    const mapMaintenanceCard = () => {
        let data = [];
        if(listMaintenanceCard !== undefined){
            data = listMaintenanceCard.map((maintenanceCard, _index) => {
                return {
                    key: maintenanceCard.id,
                    ...maintenanceCard,
                }
            })
        }
        return data;
    }

    const handleTableChange = (_pagination, _filters, sorter) => {
      
        if (sorter && sorter !== undefined) {
            setNameField( sorter.field)
            setOrder( sorter.order)
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

    const completeCard = ()=>{
        const {maintenanceCardAddActionCreator} = props
        const { actCompleteCard } = maintenanceCardAddActionCreator;
        actCompleteCard(stateLoadding.selectedRowKeys)
    }

    const [checkStrictly] = React.useState(false);
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Phiếu sửa chữa
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm phiếu sửa chữa theo mã"
                        onSearch={searchMaintenanceCard}
                        style={{ width: 200 }}
                        onChange={handleChangeSearch}
                        value={search}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle" onClick={handleCancel}>
                            <CloseOutlined />
                        </Button>
                    </div>

                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} phiếu` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected && props.user.role === 2 ? <Button onClick={completeCard}>Hoàn thành phiếu</Button> : <></> }
                </div>
            </div>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={mapMaintenanceCard()}
                // showSorterTooltip={false}
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
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalMaintenanceCard} defaultPageSize={3} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCard);