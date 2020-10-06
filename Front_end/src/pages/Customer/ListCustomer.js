import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Pagination, Modal, Empty } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as customerActions from '../../actions/customer';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import history from '../../history';
//import { NavLink } from "react-router-dom";

// const columns = [
//     {
//         title: 'Mã khách hàng',
//         dataIndex: 'code',
//         key: 'code',
//         sorter: true,
//         render: (text, data) => <NavLink to={`/admin/customers/${data.id}/histories`}>{text.toUpperCase()}</NavLink>
//     },
//     {
//         title: 'Tên khách hàng',
//         dataIndex: 'name',
//         key: 'name',
//         sorter: true
//     },
//     {
//         title: 'Số điện thoại',
//         dataIndex: 'phoneNumber',
//         key: 'phoneNumber',
//     },
//     {
//         title: 'email',
//         dataIndex: 'email',
//         key: 'email',
//     },
//     {
//         title: 'Trạng thái',
//         dataIndex: 'pay_status',
//         key: 'pay_status',
//         filters: [
//             { text: 'Đã thanh toán', value: '1' },
//             { text: 'Chưa thanh toán', value: '0' },
//           ],
//         filteredValue: filteredInfo.pay_status || null,
//         onFilter: (value, record) => record.pay_status.includes(value),
//         render: pay_status => (
//             <>
//                 {pay_status === 1 ? <span style={{color: 'blue'}}>Đã thanh toán</span> : pay_status === 2 ? <span style={{color:'green'}}>Chưa tạo phiếu</span> : <span style={{color:'red'}}>Chưa thanh toán</span>}       
//             </>
//           ),
//     }
// ];

// const data = [
//     {
//         key: 1,
//         name: 'John Brown sr.',
//         age: 60,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: 2,
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//     },
// ];


// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//         console.log(`chon: ${selectedRowKeys}`);
//     },
//     onSelect: (record, selected, selectedRows) => {
//         console.log(record, selected, selectedRows);
//     },
//     onSelectAll: (selected, selectedRows, changeRows) => {
//         console.log(selected, selectedRows, changeRows);
//     },
// };

const { Option } = Select;

const Customer = (props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('');
    const [nameField] = useState();
    const [order] = useState();
    const [current, setCurrent] = useState(1);
    const [ids, setIds] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [filteredInfo, setFilteredInfo] = useState({});


    const { customerActionCreators } = props;
    const { actGetListCustomer, actUpdateMultipleStatusCustomer, actFilterPayStatusOfCustomer } = customerActionCreators;
    const { listCustomer, totalCustomer } = props;

    console.log(listCustomer);

    useEffect(() => {
        if (search === null && search.length === 0) {
            actGetListCustomer('', pageNumber, size);
        } else {
            actGetListCustomer(search, pageNumber, size, nameField, order)
        }

    }, [actGetListCustomer, search, pageNumber, size, nameField, order]);

    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text, data) => <NavLink to={`/admin/customers/${data.id}/histories`}>{text.toUpperCase()}</NavLink>
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'pay_status',
            key: 'pay_status',
            filters: [
                { text: 'Đã thanh toán', value: '1' },
                { text: 'Chưa thanh toán', value: '0' }
            ],
            filteredValue: filteredInfo.pay_status || null,
            //onFilter: (value, record) => actFilterPayStatusOfCustomer(pageNumber, size, value),
            render: pay_status => (
                <>
                    {pay_status === "1" ? <span style={{ color: 'blue' }}>Đã thanh toán</span> : pay_status === "2" ? <span style={{ color: 'green' }}>Chưa tạo phiếu</span> : <span style={{ color: 'red' }}>Chưa thanh toán</span>}
                </>
            ),
            ellipsis: true
        },
        {
            title: "Hành động",
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => <NavLink to={`/admin/maintenanceCards/create`}>{'Tạo phiếu sửa xe'}</NavLink>
        }
    ];

    const mapCustomer = () => {
        let data = [];
        data = listCustomer.map((customer, index) => {
            return {
                ...customer,
                key: customer.id
            }
        })
        return data;
    }

    const handleTableChange = (pagination, filters, sorter) => {
        //console.log(sorter.field);
        //console.log(sorter.order);
        if (sorter && sorter !== undefined) {
            actGetListCustomer(search, pageNumber, size, sorter.field, sorter.order)
        }
        //console.log(filters);
        setFilteredInfo(filters)
    };

    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    });

    const onSelectChange = selectedRowKeys => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        setIds(selectedRowKeys);
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
    }

    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        actGetListCustomer(e.target.value, pageNumber, size)
    }

    const handleCancel = (e) => {
        setSearch('')
        actGetListCustomer(search, pageNumber, size, nameField, order)
    }

    const searchCustomer = (value) => {
        setSearch(value)
    }

    const handleChange = (value) => {
        if (value === 'delete') {
            //window.confirm("Bạn có chắc chắn muốn xóa khách hàng?");
            //actDeleteCustomer(ids);
            //history.push('/admin/customers/create')
            //actGetListCustomer(search, pageNumber, size, nameField, order)
            setVisible(true)
        }
        if (value === 'update') {
            console.log(ids);
            if (ids.length > 1) {
                alert(`Không thể cập nhật ${ids.length} khách hàng`)
            } else {
                //history.push(`/admin/customers/update/5`)
            }
        }
    }

    //model delete

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            // actDeleteCustomer(ids);
            actUpdateMultipleStatusCustomer(ids);
            actGetListCustomer(search, pageNumber, size, nameField, order);
            setConfirmLoading(false)
            setVisible(false)
        }, 2000);
    };

    const handleModalCancel = () => {
        setVisible(false)
    };

    const [checkStrictly] = React.useState(false);

    return (

        <>
            <div>
                <Modal
                    visible={visible}
                    title="Xóa khách hàng"
                    onCancel={handleModalCancel}
                    onOk={handleOk}
                    cancelText={"Thoát"}
                    okText={"Xóa"}
                    confirmLoading={confirmLoading}
                >
                    <p>Bạn có chắc chắn muốn xóa {stateLoadding.selectedRowKeys.length} khách hàng?</p>
                </Modal>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Khách hàng
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Vui lòng nhập"
                        onSearch={searchCustomer}
                        style={{ width: 235, borderRadius: 25 }}
                        value={search}
                        onChange={handleChangeSearch}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle" onClick={handleCancel}>
                            <CloseOutlined />
                        </Button>
                    </div>
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" onClick={() => history.push(`/admin/customers/create`)}>
                            <span style={{ color: "white" }}>Thêm khách hàng</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} khách hàng` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Select value="Chọn chức năng " style={{ width: 160 }} onChange={handleChange} >
                        {/* <Option value="update">Cập nhật khách hàng</Option> */}
                        <Option value="delete">Xóa khách hàng</Option>
                    </Select> : ''}
                </div>
            </div>
            <Table
                columns={columns}
                //onRow={(record, index) => {return {onClick: event => {history.push(`/admin/customers/${record.id}/histories`);}}}}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={mapCustomer()}
                locale={{ emptyText: <Empty description={"Không có dữ liệu"} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>, triggerDesc: 'Sắp xếp Z-A', triggerAsc: 'Sắp xếp A-Z', cancelSort: 'Bỏ sắp xếp', }}
                // rowKey={record => record.login.uuid}
                pagination={false}
                //loading={state.loading}
                onChange={handleTableChange}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination locale={{ items_per_page: '/ Trang' }} current={current} total={totalCustomer} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} />
            </div>
        </>
    );
}

Customer.propTypes = {
    customerAction: PropTypes.shape({
        customerActionCreators: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        listCustomer: state.customerReducer.customers,
        totalCustomer: state.customerReducer.totalItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(Customer));