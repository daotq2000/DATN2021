import { Form, Button, Col, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { actionCreateService } from '../../actions/createService';

const ServiceForm = (props) => {
    const [id, setId] = useState(props.id);
    const [state, setState] = useState({
        name: "",
        pricePerUnit: "",
        description: ""
    });
    const history = useHistory();
    const handleNameChange = (event) => {
        setState({ ...state, name: event.target.value });
    }
    const handlePricePerUnitChange = (event) => {
        setState({ ...state, pricePerUnit: event.target.value });
    }
    const handleDescriptionChange = (event) => {
        setState({ ...state, description: event.target.value });
    }
    const handleReset = () => {
        setState({
            name: "",
            pricePerUnit: "",
            description: ""
        })
    }
    const handleFinish = () => {
        // Request Body
        const data = new FormData();
        data.append("name", state.name);
        data.append("pricePerUnit", state.pricePerUnit);
        data.append("description", state.description);
        data.append("type", 2);

        console.log(props);
        if (props.productCreateActionCreator !== undefined) {
            const { actionCreateService } = props.productCreateActionCreator;
            actionCreateService(data);
        }

        if (props.productUpdateActionCreator !== undefined) {
            const { actionUpdateService } = props.productUpdateActionCreator;
            actionUpdateService(id, data);
        }

        history.push("/admin/services");
    }
    const handleFinishFail = () => {

    }
    useEffect(() => {
        if (props.product !== undefined) {
            setState(props.product);
        }
    }, [props.product]);
    return (
        <>
            <div style={{ background: "#fff", padding: 25 }}>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={handleFinish}
                    onFinishFailed={handleFinishFail}
                    fields={[
                        {
                            name: "name",
                            value: state.name
                        },
                        {
                            name: "pricePerUnit",
                            value: state.pricePerUnit
                        },
                        {
                            name: "description",
                            value: state.description
                        }
                    ]}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Tên dịch vụ" name="name">
                                <Input onChange={handleNameChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Giá vụ" name="pricePerUnit">
                                <Input onChange={handlePricePerUnitChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name="description">
                                <TextArea
                                    rows={4}
                                    style={{ resize: "none" }}
                                    onChange={handleDescriptionChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 30 }}>
                        <Row>
                            <Col span={2}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Thêm
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col>

                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Button onClick={handleReset}>
                                        Đặt lại
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default ServiceForm;