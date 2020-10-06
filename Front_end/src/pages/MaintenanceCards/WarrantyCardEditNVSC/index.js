import React from 'react';
import { Button, Row, Col, Select, Card, Tabs, AutoComplete, Input, Table, Timeline, Tag } from 'antd';
import { CheckCircleOutlined, CloseOutlined, ExclamationCircleOutlined, LeftOutlined, QuestionCircleOutlined, SortAscendingOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { Option } = Select;
const columns = [
    {
        title: 'Mã dịch vụ',
        dataIndex: 'code',
        key: 'code',
        width: '20%'
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
        width: '50%'
    },
    {
        title: 'Giá dịch vụ',
        dataIndex: 'price',
        key: 'price',
        width: '20%'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        render: status => {
            if (status === 0) {
                return (
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="lucy">
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Hoàn thành
                             </Tag>
                        </Option>
                    </Select>
                )
            }
            else {
                return (
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="lucy">
                            <Tag color="blue">
                                Đang sửa
                             </Tag>
                        </Option>
                    </Select>
                )
            }
        }
    },
];
const dataSource = [
    {
        code: 'DV001',
        name: 'Sửa săm',
        price: 10000,
        status: 1
    },
    {
        code: 'DV001',
        name: 'Thay dầu',
        price: 10000,
        status: 0
    },
]

const WarantyCardInfo = () => {

    const { Option } = Select;

    const { TabPane } = Tabs;

    const renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
    }

    const renderBodyCard = () => {
        return (
            <>
                <Row>
                    <Col span={1}>
                        <UserOutlined style={{ fontSize: 35, paddingTop: 5 }} />
                    </Col>
                    <Col span={12}>
                        <span>Nguyễn Khắc Sinh</span><br />
                        <span>0123456789</span>
                    </Col>

                </Row>
            </>
        )
    }

    const callback = (key) => {
        console.log(key);
    }
    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16, marginTop: -30 }}>
                    <p><NavLink to='/admin/customer'><LeftOutlined /> Danh sách phiếu sửa chữa</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 35 }}>
                        Phiếu sửa chữa
                </span>
                    <div style={{ float: 'right' }}>
                        <div style={{ display: 'inline' }}>
                            <Button style={{ height: 37, marginRight: 5 }} type="primary" >
                                <span>Cập nhật phiếu sửa chữa</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={18}>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin khách hàng")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <Row>
                                    <Col span={1}>
                                        <UserOutlined style={{ fontSize: 35, paddingTop: 5 }} />
                                    </Col>
                                    <Col span={12}>
                                        <span>Nguyễn Khắc Sinh</span><br />
                                        <span>0123456789</span>
                                    </Col>

                                </Row>
                            </Card>
                        </div>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin dịch vụ")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>

                                <Row>
                                    <Table columns={columns} style={{ width: '100%' }} pagination={false} dataSource={dataSource} />
                                </Row>
                                <Row>
                                    <div style={{ margin: 30, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div></div>
                                        {/* <Button>
                            <PlusOutlined />
                            <span>Thêm dịch vụ khác</span>
                        </Button> */}
                                        <div>
                                            <div style={{ width: 500, display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Tổng tiền (0 dịch vụ): </span>
                                                <span >100000đ</span>
                                            </div>
                                            <div style={{ width: 500, display: 'flex', justifyContent: 'space-between' }}>

                                                <span>Khách đã trả: </span>
                                                <span>0 đ</span>

                                            </div>
                                        </div>

                                    </div>

                                </Row>
                            </Card>
                        </div>

                        <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                            <Card title={renderTitleCard("Phiếu sửa chữa đã được thanh toán")} bordered={true} style={{ width: '100%', borderRadius: 3 }}>
                                <Timeline>
                                    <Timeline.Item color="red">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <span>Tạo phiếu: 0 đ</span>
                                            <span>12:00 24/09/2020</span>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <span>Đã thanh toán: 500 đ</span>
                                            <span>12:05 24/09/2020</span>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <span>Đã thanh toán: 1000 đ</span>
                                            <span>12:15 24/09/2020</span>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <span>Đã thanh toán toàn bộ: 100000 đ</span>
                                            <span>12:30 24/09/2020</span>
                                        </div>
                                    </Timeline.Item>
                                </Timeline>,
                            </Card>
                        </div>
                        <div style={{ marginBottom: 16, width: '100%', marginTop: 20 }}>
                            <Card title={renderTitleCard("Phiếu sửa chữa đã sửa chữa xong")} bordered={true} style={{ width: '100%', borderRadius: 3 }}>
                                <Timeline>
                                    <Timeline.Item color="red">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>Tạo phiếu</span>
                                                <p>- Thay săm</p>
                                                <p>- Thay dầu</p>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>12:00 24/09/2020</span>
                                                <p>
                                                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                                        Đang chờ
                                                    </Tag>
                                                </p>
                                                <p>
                                                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                                        Đang chờ
                                                    </Tag>
                                                </p>
                                            </div>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>Cập nhật dịch vụ</span>
                                                <p>- Thay săm</p>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                                                <p>
                                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                                        Hoàn thành
                                                    </Tag>
                                                </p>

                                            </div>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>Cập nhật dịch vụ</span>
                                                <p>- Thay dầu</p>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                                                <p>
                                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                                        Hoàn thành
                                                    </Tag>
                                                </p>

                                            </div>
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>Hoàn thành phiếu sửa chữa</span>

                                            </div>
                                            <div>
                                                <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                                                <p>
                                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                                        Hoàn thành
                                                    </Tag>
                                                </p>

                                            </div>
                                        </div>
                                    </Timeline.Item>
                                </Timeline>,
                            </Card>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ marginBottom: 16, width: '100%', marginLeft: '5%' }}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true} style={{ width: '100%', borderRadius: 3, border: 'none' }}>
                                <Row>
                                    <Col span={12}>
                                        <p>Ngày tạo</p>
                                        <p>Mã</p>
                                        <p>Số điện thoại</p>
                                        <p>Biển số xe</p>
                                        <p>Ngày trả xe</p>
                                        <p>Nhân viên điều phối</p>
                                        <p>Nhân viên sửa chữa</p>
                                        <p>Mô tả</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>: 24/09/2020 </p>
                                        <p>: RP001 </p>
                                        <p>: 123456789</p>
                                        <p>: 99D137046</p>
                                        <p>: 24/09/2020</p>
                                        <p>: NV001  -  Nhân viên 1</p>
                                        <p>: NV002  -  Nhân viên 2</p>
                                        <p>: Xe bị hỏng săm lốp</p>
                                    </Col>

                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    );
}

export default WarantyCardInfo;