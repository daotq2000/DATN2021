import React from 'react';
import { DatePicker, Card, Row, Col, List } from 'antd';
import moment from 'moment';
import { Line } from '@ant-design/charts';
import { UserOutlined } from '@ant-design/icons';
import TopService from './TopService';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const Overview = () => {

    const data = [
        { year: '28/09/2020', value: 3 },
        { year: '29/09/2020', value: 4 },
        { year: '30/09/2020', value: 3.5 },
        { year: '01/10/2020', value: 5 },
        { year: '02/10/2020', value: 4.9 },
        { year: '03/10/2020', value: 6 },
        { year: '04/10/2020', value: 7 },
        { year: '05/10/2020', value: 9 },
    ];

    const dataCustomer = [
        {
            icon: <UserOutlined />,
            title: '0 Khách sửa xe',
        },
        {
            icon: <UserOutlined />,
            title: '0 Phiếu đã tạo',
        },
        {
            icon: <UserOutlined />,
            title: '0 Phiếu hoàn thành',
        },
        {
            icon: <UserOutlined />,
            title: '0 Phiếu đã hủy',
        },
    ];

    const config = {
        data,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 'bold', fontSize: 27 }}>
                    Tổng quan báo cáo
                </span>
                <p>
                    Dữ liệu được tổng hợp đến hết ngày
                </p>
                <RangePicker
                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                    format={dateFormat}
                />
            </div>
            <div style={{ marginTop: 35 }}>
                <Row>
                    <Col span={15}>
                        <Card title="Tình hình lợi nhuận và kinh doanh toàn cửa hàng" bordered={false} style={{ width: '103%' }}>
                            <div style={{ height: 250, marginTop: 30 }}>
                                <Line {...config} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={8}>
                        <Card title="Thông tin kinh doanh ngày hôm nay" bordered={false} style={{ width: '100%', height: 385 }}>
                            <div style={{ height: 250, marginTop: -15 }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={dataCustomer}
                                    renderItem={item => (
                                        <List.Item>
                                            <div style={{}}>{item.icon}</div>
                                            <List.Item.Meta
                                                title={item.title}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div style={{ marginTop: 15 }}>
                <Row>
                    <Col span={15}>
                        <Row>
                            <Col span={11}>
                                <Card style={{ height: 83, width: '104%' }}>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            icon
                                        </div>
                                        <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                            <h2 style={{ marginBottom: -3 }}>1.000.000</h2>
                                        Tổng doanh thu
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={12}>
                                <Card style={{ height: 83, width: '103%', marginLeft: '3%' }}>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            icon
                                        </div>
                                        <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                            <h2 style={{ marginBottom: -3 }}>2,918,500</h2>
                                        Tổng lợi nhuận
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={8}>
                        <Card style={{ height: 83 }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    icon
                                        </div>
                                <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                    <h2 style={{ marginBottom: -3 }}>19.9%</h2>
                                        Tỷ suất lợi nhuận
                                        </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div style={{ marginTop: 15 }}>

                <Row >
                    <Col span={11} style={{ backgroundColor: 'white' }}>
                        <Card title="Top dịch vụ được sử dụng nhiều nhất" bordered={false} style={{ width: '105%' }}>
                            <div>
                                <TopService/>
                            </div>
                        </Card>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <Card title="Top nhân viên sửa xe" bordered={false} style={{ width: '109%' }}>
                            <div>
                                <TopService/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Overview;