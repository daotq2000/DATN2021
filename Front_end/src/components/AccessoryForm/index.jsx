import { Form, Button, Col, Input, InputNumber, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { actionUpdateAccessory } from '../../actions/updateAccessory';

const AccessoryForm = (props) => {
    const [id, setId] = useState(props.id);
    const [state, setState] = useState({
        name: "",
        quantity: 0,
        image: null,
        unit: "",
        pricePerUnit: 0,
        description: ""
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageSet, setIsImageSet] = useState(false);
    const history = useHistory();
    const handleNameChange = (event) => {
        setState({ ...state, name: event.target.value });
    };
    const handleQuantityChange = (value) => {
        setState({ ...state, quantity: value });
    };
    const handleImageChange = (event) => {
        setState({ ...state, image: event.target.files[0] });
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    };
    const handleUnitChange = (event) => {
        setState({ ...state, unit: event.target.value });
    };
    const handlePricePerUnitChange = (event) => {
        setState({ ...state, pricePerUnit: event.target.value });
    };
    const onDescriptionChange = (event) => {
        setState({ ...state, description: event.target.value });
    };

    // const { actionUpdateAccessory } = productUpdateActionCreator;
    const handleFinish = () => {
        console.log(id);
        // Request body
        const data = new FormData();
        data.append("image", state.image);
        data.append("name", state.name);
        data.append("unit", state.unit);
        data.append("pricePerUnit", state.pricePerUnit);
        data.append("description", state.description);
        data.append("quantity", state.quantity);
        data.append("type", 1);

        // Call a request
        if (props.productCreateActionCreator !== undefined) {
            const { actionCreateAccessory } = props.productCreateActionCreator;
            actionCreateAccessory(data);
        }
        if (props.productUpdateActionCreator !== undefined) {
            const { actionUpdateAccessory } = props.productUpdateActionCreator;
            actionUpdateAccessory(id, data);
        }

        // History
        history.push("/admin/accessories");
    };
    const handleFinishFail = () => { };
    const handleReset = () => {
        setState({
            name: "",
            quantity: 0,
            image: null,
            unit: "",
            pricePerUnit: 0,
            description: ""
        });
    }
    const nameRules = [
        {
            min: true,
            message: "Vui lòng nhập tên linh kiện!",
        },
    ];
    const unitRules = [
        {
            required: true,
            message: "Vui lòng nhập đơn vị!",
        },
    ];
    const pricePerUnit = [
        {
            required: true,
            message: "Vui lòng nhập giá mỗi đơn vị!",
        },
    ];
    useEffect(() => {
        if (props.product !== undefined) {
            setState(props.product);
        }
    }, [props.product]);
    useEffect(() => {
        if (props.product !== undefined) {
            setPreviewImage(`http://localhost:8080/admin/product/image/${props.product.image}`);
            if (props.product.image !== null) {
                setIsImageSet(true);
            }
        }
    }, [props.product]);
    return (
        <div style={{ background: "#fff", padding: 25 }}>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFail}
                encType="multipart/form-data"
                fields={[
                    {
                        name: "name",
                        value: state.name
                    },
                    {
                        name: "quantity",
                        value: state.quantity
                    },
                    {
                        name: "unit",
                        value: state.unit
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
                        <Form.Item label="Tên sản phẩm:" name="name">
                            <Input onChange={handleNameChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="Số lượng" name="quantity">
                            <InputNumber
                                min={0}
                                onChange={handleQuantityChange}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={16} style={{ paddingLeft: '2%' }}>
                        <Form.Item label="Đơn vị" name="unit">
                            <Input onChange={handleUnitChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Giá mỗi đơn vị" name="pricePerUnit">
                            <Input
                                min={0}
                                onChange={handlePricePerUnitChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {
                    (props.product !== undefined) ? (
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Ảnh:">
                                    {isImageSet ? (
                                        <img src={previewImage} height="350px" />
                                    ) : (
                                            <div style={{ textAlign: "center", borderRadius: "2px", background: "rgb(245 245 245)", padding: "4px 11px" }}>Không có ảnh</div>
                                        )}
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                        : (
                            <></>
                        )
                }
                <Row>
                    <Col span={24} style={{ textAlign: "left" }}>
                        <Form.Item label={(props.product !== undefined) ? "Thay đổi ảnh sản phẩm" : "Ảnh sản phẩm"} name="image">
                            <input
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả" name="description">
                    <TextArea
                        rows={4}
                        style={{ resize: "none" }}
                        onChange={onDescriptionChange}
                    />
                </Form.Item>
                <hr />
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
    );
}

export default AccessoryForm;