


import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Pagination, Badge, Modal, Spin } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as employeeActions from '../../actions/employee';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';


 
const columns = [
    {
        title: 'Mã ',
        dataIndex: 'code',
        key: 'code',
        width: '10%',
        sorter: true,

    },

    {
        title: 'Tên nhân viên',
        dataIndex: 'full_name',
        key: 'full_name',
        width: '20%',
        sorter: true,
    render: (text,data) => <Link to={`/admin/employee/${data.id}`}>{text}</Link>

    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
        key: 'email',
        sorter: true,
    },
    {
        title: 'SĐT',
        dataIndex: 'phone_number',
        width: '20%',
        key: 'phone_number',
        sorter: true,
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        width: '15%',
        key: 'role',

    },
    {
        title: 'Số phiếu sửa chữa',
        dataIndex: 'status',
        width: '15%',
        key: 'status',
    }
];


const { Option } = Select;

const EmployeeList = (props) => {

    const handleOk = async e => {
        let data = stateLoadding.selectedRowKeys;
        console.log(data);
        actDeleteEmployee(data);

        setState({
            visible: false,
        });

        actFetchData(pageNumber, size, '', '', '')

    };
    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };
    const showModal = () => {
        setState({
            ...state, visible: true,
        });
    };
    const [state, setState] = useState({
        visible: false
    });
    const [current, setCurrent] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('');
    const { employeeActionsCreator } = props;
    const { actFetchData } = employeeActionsCreator;
    const { actDeleteEmployee } = employeeActionsCreator;
    const { users, totalPage, totalElement } = props;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (search !== null && search.length > 0) {
            actFetchData(pageNumber, size, '', '', search);
        } else {
            console.log('aloo');
            actFetchData(pageNumber, size, '', '', '');
        }


    }, [actFetchData, search, pageNumber, size, current, loading])
    const pushDataToTable = () => {
        console.log(users);
        let roleUser = "";
        let data = [];
        if (users !== undefined) {
            data = users.map((val) => {
               
                if(val.role === 1){
                    roleUser="Nhân viên điều phối";
                }else if(val.role ===2){
                    roleUser="Nhân viên sửa chữa"
                }else{
                    roleUser="Nhân viên Quản Lý"
                }
                return {
                    ...val,
                }
            });
        }
        return data;
    }
    const handleChangeOption = (value) => {
        if (value === 'delete') {
            showModal();
        }
    }
    const handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
        let descending = true;
        
        if (sorter && sorter !== undefined) {
            actFetchData(pageNumber, size, sorter.field, descending, search);
        }
    };

    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [],
        loading: false,
    });

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setStateLoadding({ selectedRowKeys });
    };

    const rowSelection = {
        selectedRowKeys: stateLoadding.selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = stateLoadding.selectedRowKeys.length > 0;

    const onChange = (page) => {
        setCurrent(page)
        setPageNumber(page)
    }
    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
    }
    const searchEmployee = (e) => {
        console.log(e);
        // setSearch(value)
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        actFetchData(pageNumber, size, '', '', search);
    }

    const [checkStrictly] = React.useState(false);
    return (

        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Danh sách nhân viên
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm nhân viên"
                        onSearch={searchEmployee}
                        style={{ width: 200 }}
                        onChange={handleChangeSearch}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle">
                            <CloseOutlined />
                        </Button>
                    </div>
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" >
                            <span>Thêm nhân viên</span>
                        </Button>
                    </div>
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" >
                            <SettingOutlined />
                            <span>Tùy chỉnh</span>
                        </Button>
                    </div>

                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} items` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Select value="Chọn chức năng " style={{ width: 160 }} onChange={handleChangeOption} >
                        <Option value="upate">Cập nhật khách hàng</Option>
                        <Option value="delete">Xóa khách hàng</Option>
                    </Select> : ''}
                </div>
            </div>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={pushDataToTable()}
                // rowKey={record => record.login.uuid}
                pagination={false}
                loading={pushDataToTable().length == 0 ? true : false}
                onChange={handleTableChange}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalElement} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} />
            </div>
            <Modal
                title="Xác nhận xóa "
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Xóa'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={loading} delay={500}>
                    Bạn có chắc chắn muốn xóa dịch vụ này?
          </Spin>
            </Modal>
        </>
    );
}
EmployeeList.propTypes = {
    createEmployee: PropTypes.shape({
        employeeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        users: state.employeeReducer.users,
        totalElement: state.employeeReducer.totalElement,
        currentPage: state.employeeReducer.currentPage,
        totalPage: state.employeeReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeList));
