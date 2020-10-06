import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Pagination, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import { CheckCircleOutlined, CloseOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaintenanceCardActions from '../../actions/MaintenanceCard';

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
        sorter: true,
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
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: 'Đang chờ và chưa thanh toán', value: '0' },
            { text: 'Đang chờ và đã thanh toán', value: '1' },
            { text: 'Đang sửa và chưa thanh toán', value: '2' },
            { text: 'Đang sửa và đã thanh toán', value: '3' },
            { text: 'Đã sửa và chưa thanh toán', value: '4' },
            { text: 'Hoàn thành', value: '5' },
        ],
        ellipsis: true,
        render: (status) => {
            if (status.workStatus === 0 && status.payStatus === 0) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="warning">
                        Đang chờ và chưa thanh toán
                    </Tag>
                )
            }
            else if (status.workStatus === 1 && status.payStatus === 0) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="processing">
                        Đang sửa và chưa thanh toán
                    </Tag>
                )
            }
            else if (status.workStatus === 2 && status.payStatus === 0) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Đã sửa và chưa thanh toán
                    </Tag>
                )
            }
            else if (status.workStatus === 0 && status.payStatus === 1) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="warning">
                        Đang chờ và đã thanh toán
                    </Tag>
                )
            }
            else if (status.workStatus === 1 && status.payStatus === 1) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="processing">
                        Đang sửa và đã thanh toán
                    </Tag>
                )
            }
            else if (status.workStatus === 2 && status.payStatus === 1) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Hoàn thành
                    </Tag>
                )
            }

        },
        width: '20%'
    },
    {
        title: 'Ngày trả xe',
        dataIndex: 'returnDate',
        key: 'returnDate',
        sorter: true,
        render: (returnDate) => {
            if (returnDate !== null) {
                let date = new Date(returnDate);
                return (
                    <span>{`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear() + 1}`}</span>
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
    const [current, setCurrent] = useState(1);


    const { maintenanceCardActionCreators } = props;
    const { actFetchMaintenanceCardByIdCustomer } = maintenanceCardActionCreators;
    const { listMaintenanceCard, totalMaintenanceCard } = props;

    useEffect(() => {

        actFetchMaintenanceCardByIdCustomer(pageNumber, size, props.id)

    }, [actFetchMaintenanceCardByIdCustomer,pageNumber, size,props.id]);

    const mapMaintenanceCard = () => {
        let data = [];
        if(listMaintenanceCard !== undefined) {
            data = listMaintenanceCard.map((maintenanceCard, _index) => {
                return {
                    key: maintenanceCard.id,
                    ...maintenanceCard,
                    status: {
                        workStatus: maintenanceCard.workStatus,
                        payStatus: maintenanceCard.payStatus
                    }
                }
            })
        }
        return data;
    }

    const onChange = (pageNumber) => {
        setCurrent(pageNumber)
        setPageNumber(pageNumber)
    }

    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
    }

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="input search text"
                        //onSearch={searchMaintenanceCard}
                        style={{ width: 200 }}
                       // onChange={handleChangeSearch}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle" >
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={mapMaintenanceCard()}
                pagination={false}
                //onChange={handleTableChange}
                locale={{
                    filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                    emptyText: "Không có phiếu sửa chữa nào",
                    triggerDesc: 'Sắp xếp từ Z -> A',
                    triggerAsc: 'Sắp xếp từ A -> Z',
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
        listMaintenanceCard: state.maintenanceCard.customers,
        totalMaintenanceCard: state.maintenanceCard.totalItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        maintenanceCardActionCreators: bindActionCreators(MaintenanceCardActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCard);