
import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Pagination, Modal, Spin} from 'antd';
import Search from 'antd/lib/input/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as colorActions from '../../actions/colorBike';
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
        render: (text, data) => <Link className="link" to={`/admin/colorbike/${data.id}`}>{text.toUpperCase()}</Link>
    },

    {
        title: 'Tên màu',
        dataIndex: 'name',
        key: 'name',
        // width: '20%',
        sorter: true,


    }
    ,

    {
        title: 'Tên mẫu xe',
        dataIndex: 'name2',
        key: 'name2',
        // width: '20%',
        sorter: true,


    }
    ,

    {
        title: 'Tên nhà sản xuất',
        dataIndex: 'name3',
        key: 'name3',
        // width: '20%',
        sorter: true,


    }

];


const { Option } = Select;

const ColorList = (props) => {
    const handleOk = e => {
        let data = stateLoadding.selectedRowKeys;
        actDeleteColorBike(data);
        setState({
            visible: false,
        });
    };
    const handleCancel = e => {
        console.log(e);
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
    const { colorActionsCreator } = props;
    const { actFetchData } = colorActionsCreator;
    const { actDeleteColorBike } = colorActionsCreator;
    const { colors, totalPage, totalElement } = props;
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
        if (colors !== undefined) {
            data = colors.map((val) => {
              
                return {
                    ...val,
                    name2: val.modelBike.name,
                    name3: val.modelBike.manufacture.name,
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
 
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        actFetchData(pageNumber, size, '', '', search);
    }
    const [checkStrictly] = React.useState(false);
    return (

        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Danh sách màu
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm màu theo Tên, Mã"
                        style={{ width: 400, marginTop: 20, marginRight: 10 }}
                        onChange={handleChangeSearch}
                        value={search}
                        allowClear={true}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <NavLink to="/admin/colorbike/create">
                            <Button type="primary">
                                <span>Thêm mới màu</span>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} màu` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Button onClick={showModal}>Xóa màu</Button> : ''}

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
                        history.push(`/admin/colorbike/update/${r.id}`)
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
                    Bạn có chắc chắn muốn xóa màu này?
                </Spin>
            </Modal>
        </>
    );
}
ColorList.propTypes = {
    createColor: PropTypes.shape({
        colorActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => { 
    return {
        
        colors: state.colorBikeReducer.colorBikes,
        totalElement: state.colorBikeReducer.totalElement,
        currentPage: state.colorBikeReducer.currentPage,
        totalPage: state.colorBikeReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        colorActionsCreator: bindActionCreators( colorActions , dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)( ColorList));
