import React from 'react';
import { Button, Row, Col, Select, Card, Tabs, AutoComplete, Input, Table, Timeline, Tag, Form } from 'antd';
import { CheckCircleOutlined, CloseOutlined, ExclamationCircleOutlined, LeftOutlined, QuestionCircleOutlined, SortAscendingOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
};

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
        width: '40%'
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
                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        Đang chờ
                    </Tag>
                )
            } else if (status === 1) {
                return (
                    <Tag icon={<ExclamationCircleOutlined />} color="success">
                        Hoàn thành
                    </Tag>
                )
            }
        }
    },
    {
        title: '',
        dataIndex: 'code',
        key: 'close',
        width: '10%',
        render: (key, data) => {
            if (data.status > 0) {
                return <></>
            }
            else {
                return (
                    <CloseOutlined onClick={() => { console.log(key) }} />
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

    const renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
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
                                    <AutoComplete
                                        dropdownClassName="certain-category-search-dropdown"
                                        style={{ width: '100%' }}

                                    >
                                        <Input size="large" placeholder="Tìm kiếm dịch vụ" />
                                    </AutoComplete>
                                </Row>
                                <Row>
                                    <Table dataSource={dataSource} columns={columns} style={{ width: '100%' }} pagination={false} />
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

                    </Col>
                    <Col span={6}>
                        <div style={{ marginBottom: 16, width: '100%', marginLeft: '5%' }}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true} style={{ width: '100%', borderRadius: 3, border: 'none' }}>
                                <Row>
                                    <Form
                                        {...layout}
                                        name="basic"
                                        style={{ width: '100%' }}
                                    >

                                        <Form.Item
                                            label="Mã"
                                            name="txtCode"
                                            rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
                                            labelAlign="left"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="txtPhoneNumber"
                                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                                            {
                                                pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                max: 10,
                                                message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                            }]}
                                            labelAlign="left"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Biển số xe"
                                            name="txtPlatesNumber"
                                            rules={[{ required: true, message: 'Vui lòng nhập biển số xe!' },
                                            {
                                                pattern: '[0-9]{2}[a-zA-Z]{1}[0-9]{5,6}',
                                                max: 9,
                                                message: 'Vui lòng nhập đúng định dạng biển số xe!',
                                            }]}
                                            labelAlign="left"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ngày trả xe:"
                                            name="txtReturnDate"
                                            rules={[{ required: true, message: 'Vui lòng nhập ngày!' },
                                            ]}
                                            labelAlign="left"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Mô tả:"
                                            name="txtDescription"
                                            rules={[{ required: true, message: 'Vui lòng nhập description!' },
                                            ]}
                                            labelAlign="left"
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Form>
                                   
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