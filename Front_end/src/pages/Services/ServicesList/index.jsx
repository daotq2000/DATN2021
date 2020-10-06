import { CloseOutlined } from '@ant-design/icons';
import { Button, Pagination, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as getServicesAction from '../../../actions/services';

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (code, data) => {
            return <Link to={`/admin/services/detail/${data.id}`}>{code}</Link>
        }
    },
    {
        title: "Dịch vụ",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Giá",
        dataIndex: "pricePerUnit",
        key: "pricePerUnit",
    }
];

const ServicesList = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1
        },
        loading: false,
    });
    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [],
        loading: false,
    });
    const [search, setSearch] = useState("");
    const onSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setStateLoadding(selectedRowKeys);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
    };

    const rowSelection = {
        selectedRowKeys: stateLoadding.selectedRowKeys,
        onChange: onSelectChange,
    };

    const onChange = (pageNumber) => {
        setState({ ...state, pagination: { current: pageNumber } });
    };

    const { productsActionCreator } = props;
    const { actionGetServices } = productsActionCreator;
    useEffect(() => {
        actionGetServices(search, state.pagination.current, 7);
    }, [search, actionGetServices, state.pagination.current]);
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Dịch vụ
                </span>
                <div style={{ float: "right" }}>
                    <Search
                        placeholder="Nhập tên hoặc mã linh kiện"
                        onChange={(event) => { setSearch(event.target.value) }}
                        style={{ width: 250 }}
                    />
                    <div style={{ display: "inline", margin: 5 }}>
                        <Button type="primary" shape="circle">
                            <CloseOutlined />
                        </Button>
                    </div>
                    <div style={{ display: "inline", margin: 5 }}>
                        <Button type="primary" onClick={() => history.push("/admin/services/create")}>
                            <span>Thêm dịch vụ</span>
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    rowSelection={{ ...rowSelection }}
                    dataSource={props.services}
                    rowKey={service => service.id}
                    pagination={false}
                    loading={state.loading}
                    onChange={handleTableChange}
                />
                <div style={{ float: "right", marginTop: 10 }}>
                    <Pagination
                        current={state.pagination.current}
                        total={props.totalItems}
                        onChange={onChange}
                        defaultPageSize={7}
                    />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        services: state.servicesReducer.content,
        totalItems: state.servicesReducer.totalElements
    };
}

const mapDispatchToProps = dispatch => {
    return {
        productsActionCreator: bindActionCreators(getServicesAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);