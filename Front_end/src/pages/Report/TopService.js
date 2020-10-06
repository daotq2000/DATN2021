import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Tên dịch vụ',
        dataIndex: 'service',
        key: 'service'
    },
    {
        title: 'Tổng doanh thu',
        dataIndex: 'total',
        key: 'total',
    }
]
const data = [
    {
        key: '1',
        service: 'Dịch vụ thay săm',
        total: 32,
    },
    {
        key: '2',
        service: 'Dịch vụ thay lốp',
        total: 42
    },
    {
        key: '3',
        service: 'Dịch vụ thay dầu',
        total: 32
    },
];

const TopService = () => {
    return (
        <div>
            <Table style={{ marginTop: -15 }} dataSource={data} columns={columns} pagination={false} />
        </div>
    );
};

export default TopService;