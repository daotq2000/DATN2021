
import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Pagination, Badge, Modal, Spin, message } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as storeActions from '../../actions/store';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history'

const columns = [
    {
        title: 'Mã',
        dataIndex: 'code',
        key: 'code',
        // width: '10%',
        sorter: true,
     render: (text, data) => <Link className="link" to={`/admin/${data.id}`}>{text.toUpperCase()}</Link>
    },

    {
        title: 'Tên cửa hàng',
        dataIndex: 'name',
        key: 'name',
        // width: '20%',
        sorter: true,
    },
    {
        title: 'SĐT',
        dataIndex: 'phone',
        // width: '10%',
        key: 'phone',
        sorter: true,
    }
];


const { Option } = Select;

const StoreList = (props) => {
    const [refesh, setRefesh] = useState(false);
    const handleOk = e => {
        let data = stateLoadding.selectedRowKeys;
        console.log(data);
        actDeleteStore(data);

        setState({
            visible: false,
        });
        setRefesh(true);
    };
    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };
   
    const showModal = () => {
        let allow = true;    
        if (allow) {
            setState({
                ...state, visible: true,
            });
        }

    };
    const [state, setState] = useState({
        visible: false
    });
    const [current, setCurrent] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState('');
    const { storeActionsCreator } = props;
    console.log(props);
    const { actFetchDataStore } = storeActionsCreator;
    const { actDeleteStore } = storeActionsCreator;
    const { stores, totalPages, totalElements } = props;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (search !== null && search.length > 0) {
            actFetchDataStore(pageNumber, size, '', '', search);
        } else {
            actFetchDataStore(pageNumber, size, '', '', '');
        }

    }, [actFetchDataStore, search, pageNumber, size, current, loading])

    const pushDataToTable = () => {
        let hasStatus = '';
        let data = [];
        if (stores !== undefined) {
            data = stores.map((val) => {
                if (val.status === 1) {
                    hasStatus = "Cửa hàng đang hoạt động";
                } else {
                    hasStatus = "Cửa hàng không còn hoạt động"
                }
                return {
                    ...val,
                    status: hasStatus,
                    key: val.id
                }
            });
        }
        return data;
    }

    const mapStore = () => {
        let data = [];
        data = stores.map((stores, index) => {
            return {
                ...stores,
                key: stores.id
            }
        })
        return data;
    }

    const handleTableChange = (pagination, filters, sorter) => {

        let descending = sorter.order === 'ascend' ? 'asc' : 'desc';

        if (sorter && sorter !== undefined) {
            actFetchDataStore(pageNumber, size, sorter.field, descending, search);
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
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }
    const changePageSize = (current, size) => {

        setPageNumber(current)
        setSize(size)

    }
    const searchStore = (e) => {
        console.log(e);
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        actFetchDataStore(pageNumber, size, '', '', search);
    }

    const [checkStrictly] = React.useState(false);
    return (

        <>
            <div style={{ marginBottom: 16 }}>
              
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm cửa hàng theo Tên, Mã, hoặc SĐT"

                        style={{ width: 400, marginTop: 20, marginRight: 10 }}
                        onChange={handleChangeSearch}
                        value={search}
                        allowClear={true}
                    />


                    <div style={{ display: 'inline', margin: 5 }}>
                        <NavLink to="/admin/stores/create">
                            <Button type="primary">
                                <span>Thêm mới cửa hàng</span>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} cửa hàng` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Button onClick={showModal}>Xóa nhà cửa hàng</Button> : ''}

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
                locale={{
                    filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                    emptyText: "Không có cửa hàng nào",
                    triggerDesc: 'Sắp xếp giảm dần',
                    triggerAsc: 'Sắp xếp giảm dần',
                    cancelSort: 'Hủy sắp xếp',
                }}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`stores/update/${r.id}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalElements} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
            </div>
            <Modal
                title="Xác nhận xóa "
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Xóa'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={false} delay={500}>
                    Bạn có chắc chắn muốn xóa cửa hàng này?
                </Spin>
            </Modal>
        </>
    );
}
StoreList.propTypes = {
    createStore: PropTypes.shape({
        storeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        stores: state.storeReducer.stores,
        totalElements: state.storeReducer.totalElements,
        currentPage: state.storeReducer.currentPage,
        totalPages: state.storeReducer.totalPages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        storeActionsCreator: bindActionCreators(storeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(StoreList));
