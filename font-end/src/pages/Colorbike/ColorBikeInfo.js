import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Card, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as colorActions from '../../actions/colorBike';
import PropTypes from 'prop-types';
const ColorInfo = (props) => {
    const history = useHistory();
    const id = useParams().id;
    const { Option } = Select;
    const { colorActionsCreator } = props;
    const { actGetColorBike } =  colorActionsCreator;
    const { actDeleteColorBike} =  colorActionsCreator;
    const { colorItem } = props;
    const [current, setCurrent] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(5);
    useEffect(() => {
        actGetColorBike(id, 5, '', '', '');
    }, [actGetColorBike, pageNumber, size, current])
    useEffect(() => {
        actGetColorBike(props.match.params.id, 5, '', '', '');
    }, [props.match.params.id])
    const handleChangeOption = (value) => {
        if (value === 'update') {
            history.push(`../../admin/colorbike/update/${id}`);
        }
        if (value === 'delete') {
            const arrayId = [id];
            actDeleteColorBike(arrayId);
            history.push('../../admin/colorbike')
        }
    }
    const renderTitleCard = () => {
        return (
            <>
                <Row>
                    <Col span={8}>Thông tin màu</Col>               
                    <Col span={8}>
                        <Select value="Chọn chức năng " style={{ float: 'right', width: 250 }} onChange={handleChangeOption} >
                            <Option value="update">Cập nhật màu</Option>
                            <Option value="delete">Xóa màu</Option>
                        </Select></Col>
                </Row>
            </>
        )
    }
    const renderBodyCard = (props) => {
        return (
            <>
                <Row>
                    <Col span={8}>
                        <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={10}>Mã màu </Col>
                            <Col span={14}>: {props.code === undefined? '':props.code.toUpperCase()}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={10}>Tên màu </Col>
                            <Col span={14}>: {props.name}</Col>
                        </Row>

                    </Col> 
                    <Col style={{width: '700px'}}>
                  <Row style={{ marginBottom: 6, marginTop: 8 }}>
                            <Col span={5}>Thời gian tạo</Col>
                            <Col span={14}>: {props.createdDate}</Col>
                        </Row>
                        <Row style={{ marginBottom: 6 }} >
                            <Col span={5}>Thời gian cập nhật </Col>
                            <Col span={14}>: {props.modifiedDate}</Col>
                        </Row>
                                 
                  </Col>                                            
                </Row>
                           
            </>
        )
    }
    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16, marginTop: -30 }}>
                    <p><NavLink to='/admin/colorbike'><LeftOutlined /> Danh sách màu</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Chi tiết màu
                </span>
                </div>
                <div style={{ marginBottom: 16, width: '100%' }}>
                    <Card title={renderTitleCard()} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                        {renderBodyCard(colorItem)}
                    </Card>
                </div>
            </div>     
        </>
    );
}

ColorInfo.propTypes = {
    createColor: PropTypes.shape({
        ColorActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {      
        colorItem: state.colorBikeReducer.colorBikeItem,
        totalElement: state.colorBikeReducer.totalElement,
        totalPage: state.colorBikeReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        colorActionsCreator: bindActionCreators( colorActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ColorInfo));

