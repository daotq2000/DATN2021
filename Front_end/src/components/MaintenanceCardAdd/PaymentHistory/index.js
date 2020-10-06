
import { Timeline, Card, Button, Input, Form, Modal,Select, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/DateFormat'

const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
};

const { Option } = Select;
const PaymentHistory = (props) => {

    const [paymentHistories, setPaymentHistories] = useState([]);
    const [price, setPrice] = useState(0);
    const [user, setUser] = useState({
        role: 0
    });
    const [isShowAdd, setIsShowAdd] = useState(false);
    useEffect(() => {
        setPaymentHistories(props.maintenanceCardAdd.paymentHistories)
    }, [props.maintenanceCardAdd.paymentHistories]);
    useEffect(() => {
        setUser(props.user)
    }, [props.user]);

    useEffect(() => {
        setPrice(props.maintenanceCardAdd.price)
    }, [props.maintenanceCardAdd.price]);

    useEffect(() => {
        setIsShowAdd(props.maintenanceCardAdd.ui.paymentModal)
    }, [props.maintenanceCardAdd.ui]);

    const showTimeLine = () => {
        let result = [];
        let n = paymentHistories.length;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                result.push(<Timeline.Item color="blue" key={i}>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <span>Đã thanh toán: {paymentHistories[i].money} đ</span>
                        <span>{formatDate(paymentHistories[i].createdDate)}</span>
                    </div>
                </Timeline.Item>)
            }
        }

        return result;
    }

    const showTotalMoney = () => {
        let result = 0;
        let n = paymentHistories.length;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                result += paymentHistories[i].money;
            }
        }

        return result;
    }

    const totalPayment = showTotalMoney();

    const showModel = () => {
        setIsShowAdd(true)
    }

    const toggleAddModal = () => {
        setIsShowAdd(!isShowAdd)
    }

    const renderTitlePaymentCard = (text) => {
        return (
            <>
                <div>
                    <span>{text}</span>
                    {user.role === 3 &&  price - totalPayment > 0 ? <Button style={{ float: 'right' }} type="primary"
                        onClick={showModel}>Thanh toán</Button> : ""}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Đã thanh toán: {totalPayment} đ</span>
                    <span>Còn phải trả: {price - totalPayment} đ</span>
                    <span></span>
                </div>

            </>
        )
    }

    const onFinish = (values) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actCreatePaymentHistory } = maintenanceCardAddActionCreators;
        actCreatePaymentHistory(values)
    }

    return (
        <>
            <Card title={renderTitlePaymentCard("Lịch sử thanh toán")} bordered={true} style={{ width: '100%', borderRadius: 3 }}>
                <Timeline>
                    {showTimeLine()}
                </Timeline>
            </Card>
            <Modal
                title="Thanh toán"
                centered
                visible={isShowAdd}
                onOk={toggleAddModal}
                onCancel={toggleAddModal}
                footer={[
                    <Button key={1} onClick={toggleAddModal}>
                        Quay lại
                                        </Button>,
                    <Button form="payment" key="submit" htmlType="submit" type="primary" >
                        Thanh toán
                    </Button>
                ]}
            >
                <Form
                    {...layout}
                    name="payment"
                    onFinish={onFinish}
                    fields={
                        [
                            {
                                name: "txtPaymentMethod",
                                value: "1"
                            },
                            {
                                name: "txtMoney",
                                value: price - totalPayment
                            },
                        ]
                    }
                >
                    <Form.Item
                        label="Phương thức thanh toán: "
                        name='txtPaymentMethod'
                    >
                        <Select initialValues="1" >
                            <Option value="1">Tiền mặt</Option>
                            <Option value="2">Chuyển khoản</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Số tiền thanh toán: "
                        name='txtMoney'
                    >
                        <InputNumber min={0} max={price - totalPayment} style={{width:'100%'}} />
                    </Form.Item>

                </Form>
            </Modal>
        </>

    );
}

export default PaymentHistory;