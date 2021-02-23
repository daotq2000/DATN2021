
import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Pagination, Badge, Modal, Spin, message } from 'antd';
import Search from 'antd/lib/input/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as categoryActions from '../../actions/category';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history'

const columns = [
    {
        title: 'Mã ',
        dataIndex: 'code',
        key: 'code',
        // width: '10%',
        sorter: true,
        render: (text, data) => <Link className="link" to={`/admin/category/${data.id}`}>{text.toUpperCase()}</Link>
    },

    {
        title: 'Tên danh mục sản phẩm',
        dataIndex: 'name',
        key: 'name',
        // width: '20%',
        sorter: true,


    },  
    {
        title: 'Gi chú',
        dataIndex: 'description',
        // width: '15%',
        key: 'description',
        sorter: true
    }
];


const { Option } = Select;

const ManufacturerList = (props) => {
    const handleOk = e => {
        let data = stateLoadding.selectedRowKeys;
        actDeleteCategory(data);
        setState({
            visible: false,
        });
    };
    const handleCancel = e => {
        setState({
            visible: false,
        });
    };
    const showModal = () => {
        let allow = true;
        let data = stateLoadding.selectedRowKeys;
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
    const {  categoryActionsCreator } = props;
    const { actFetchData } =  categoryActionsCreator;
    const { actDeleteCategory } =  categoryActionsCreator;
    const { category, totalPage, totalElement } = props;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (search !== null && search.length > 0) {
            actFetchData(pageNumber, size, '', '', search);
        } else {
            actFetchData(pageNumber, size, '', '', '');
        }

    }, [actFetchData, search, pageNumber, size, current, loading])

    const pushDataToTable = () => {
        let hasRole = '';
        let data = [];
        if ( category !== undefined) {
            data =  category.map((val) => {
              
                return {
                    ...val,
                    role: hasRole,
                    key: val.id,
                    
                }
            });
        }
        return data;
    }

    const handleTableChange = (pagination, filters, sorter) => {

        let descending = sorter.order === 'ascend' ? 'asc' : 'desc';

        if (sorter && sorter !== undefined) {
            actFetchData(pageNumber, size, sorter.field, descending, search);
        }
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
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        actFetchData(pageNumber, size, '', '', search);
    }
    const [checkStrictly] = React.useState(false);
    return (

        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Danh sách  danh mục sản phẩm
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm danh mục sản phẩm theo Tên, Mã"
                        style={{ width: 400, marginTop: 20, marginRight: 10 }}
                        onChange={handleChangeSearch}
                        value={search}
                        allowClear={true}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <NavLink to="/admin/category/create">
                            <Button type="primary">
                                <span>Thêm mới  danh mục sản phẩm</span>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length}  danh mục sản phẩm` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Button onClick={showModal}>Xóa  danh mục sản phẩm</Button> : ''}

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
                    emptyText: "Không có nhân viên nào",
                    triggerDesc: 'Sắp xếp giảm dần',
                    triggerAsc: 'Sắp xếp giảm dần',
                    cancelSort: 'Hủy sắp xếp',
                }}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/category/update/${r.id}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalElement} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
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
                    Bạn có chắc chắn muốn xóa danh mục sản phẩm này?
                </Spin>
            </Modal>
        </>
    );
}
ManufacturerList.propTypes = {
    createCategory: PropTypes.shape({
        categoryActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => { 
 
    return {
        category: state.categoryReducer.category,
        totalElement: state.categoryReducer.totalElement,
        currentPage: state.categoryReducer.currentPage,
        totalPage: state.categoryReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        categoryActionsCreator: bindActionCreators( categoryActions , dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ManufacturerList));
