
import { AutoComplete, DatePicker, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { formatDate } from '../../../utils/DateFormat'
const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
};

const colors = [
    {
        label: 'Màu sắc',
        options: [
            {
                value: 'xanh lá',
                label: (
                    <div>xanh lá</div>
                ),
            },
            {
                value: 'đỏ',
                label: (
                    <div>đỏ</div>
                ),
            },
            {
                value: 'tím',
                label: (
                    <div>tím</div>
                ),
            },
            {
                value: 'vàng',
                label: (
                    <div>vàng</div>
                ),
            },
            {
                value: 'xanh dương',
                label: (
                    <div>xanh dương</div>
                ),
            },
            {
                value: 'trắng',
                label: (
                    <div>trắng</div>
                ),
            },
            {
                value: 'đen',
                label: (
                    <div>đen</div>
                ),
            },
        ]
    }
]


const MaintenanceCardInfo = (props) => {

    const [info, setInfo] = useState({});
    const [id, setId] = useState(0);
    const [coordinator, setCoordinator] = useState({});
    const [edit, setEdit] = useState(false);
    const [lisRepairman, setLisRepairman] = useState([]);
    const [repairmanSearch, setRepairmanSearch] = useState('');
    const [repairmanPage, setRepairmanPage] = useState(0);
    const [totalRepairman, setTotalRepairman] = useState(0);
    const [user, setUser] = useState({
        role: 0
    });
    const formRef = React.createRef();

    useEffect(() => {
        setEdit(props.maintenanceCardAdd.repairman.edit)
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)
        if (props.maintenanceCardAdd.id !== 0) {
            setCoordinator(props.maintenanceCardAdd.coordinator)
        }
        else {
            setCoordinator(props.user)
        }
        setId(props.maintenanceCardAdd.id)
        setUser(props.user)
    }, [props.maintenanceCardAdd.info, props.maintenanceCardAdd.repairman.user, props.maintenanceCardAdd.repairman,
    props.maintenanceCardAdd.coordinator, props.maintenanceCardAdd.id, props.user]);

    useEffect(() => {
        setInfo(props.maintenanceCardAdd.info)
    }, [props.maintenanceCardAdd.info]);
    useEffect(() => {
        setRepairmanPage(props.maintenanceCardAdd.repairmanPage)
    }, [props.maintenanceCardAdd.repairmanPage]);
    useEffect(() => {
        setTotalRepairman(props.maintenanceCardAdd.totalRepairman)
    }, [props.maintenanceCardAdd.totalRepairman]);
    useEffect(() => {
        setLisRepairman(props.maintenanceCardAdd.listRepairman)
    }, [props.maintenanceCardAdd.listRepairman]);
    useEffect(() => {
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)
    }, [props.maintenanceCardAdd.repairman]);
    const renderRepairmanItem = (repairman) => {
        return {
            value: repairman.user.id.toString(),
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{repairman.user.fullName}</span>
                    <span>{repairman.numberMaintenanceCards}</span>
                </div>
            ),
        };
    };

    const renderRepairmanOptions = () => {
        let result = [];
        result = lisRepairman.map((item, index) => {
            return (
                renderRepairmanItem(item)
            )
        })

        return [
            {
                label: <span>Thông tin nhân viên sửa chữa</span>,
                options: result,
            },
        ]
    }

    const selectRepairmanItem = (value) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actChooseRepairman } = maintenanceCardAddActionCreators;
        actChooseRepairman(value)
    }

    const focusRepairmanInput = () => {
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchRepairman } = maintenanceCardAddActionCreators;
        if (repairmanSearch === undefined) {
            actSearchRepairman('', 1, 7)
        }
        else {
            actSearchRepairman(repairmanSearch, 1, 7)
        }
    }

    const handleChangeRepairmanSearch = (e) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchRepairman } = maintenanceCardAddActionCreators;
        actSearchRepairman(e.target.value, 1, 7)
        setRepairmanSearch(e.target.value)
    }

    const submitForm = (values) => {
        const { maintenanceCardAddActionCreators } = props;
        if (id === 0) {
            const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
            actCreateMaintenanceCard(values, true)
        }
        else {
            const { actUpdateMaintenanceCard } = maintenanceCardAddActionCreators;
            actUpdateMaintenanceCard(values)
        }
    }

    const submitFailedForm = (values) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
        actCreateMaintenanceCard(values, false)
    }

    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalRepairman > repairmanPage * 7) {
                const { maintenanceCardAddActionCreators } = props;
                const { actUpdateListRepairman } = maintenanceCardAddActionCreators;
                if (repairmanSearch === undefined) {
                    actUpdateListRepairman("")
                }
                else
                    actUpdateListRepairman(repairmanSearch)
            }
        }
    }

    const renderFields = () => {
        return [
            {
                name: 'txtRepairman',
                value: repairmanSearch,
            },
            {
                name: 'txtCoordinator',
                value: props.user.fullName,
            },
            {
                name: 'txtCode',
                value: info.code,
            },
            {
                name: 'txtPlatesNumber',
                value: info.platesNumber,
            },
            {
                name: 'txtColor',
                value: info.color,
            },
            {
                name: 'txtModel',
                value: info.model,
            },
            {
                name: 'txtReturnDate',
                value: info.returnDate === "" || info.returnDate === null ? "" : moment(info.returnDate),
            },
            {
                name: 'txtDescription',
                value: info.description,
            },
            {
                name: 'txtCoordinator',
                value: coordinator.fullName,
            },
        ]

    }

    const changeInput = (e) => {
        let target = e.target;
        if (target !== null && target !== undefined) {
            let a = { ...info };
            a[target.name] = target.value;
            console.log(a);
            setInfo(a)
        }
        else {
            let a = { ...info };
            a["returnDate"] = e._d;
            console.log(a);
            setInfo(a)
        }
    }

    const handleSelectColor = (e) => {
        let a = { ...info };
        a["color"] = e;
        console.log(a);
        setInfo(a)
    }

    return (
        <Row>
            <Form
                ref={formRef}
                {...layout}
                name="maintenanceCardInfo"
                style={{ width: '100%' }}
                onFinish={submitForm}
                fields={renderFields()}
                initialValues={renderFields()}
                onFinishFailed={submitFailedForm}

            >
                <Form.Item
                    label="Mã"
                    name="txtCode"
                    labelAlign="left"
                >
                    {user.role !== 1 ? <span>{info.code}</span> :
                        <Input onChange={changeInput} name="code" />}

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
                    {id ? <span>{info.platesNumber}</span> : <Input onChange={changeInput} name="platesNumber" />}

                </Form.Item>
                <Form.Item
                    label="Nhân viên sửa chữa:"
                    name="txtRepairman"
                    labelAlign="left"
                >
                    {edit && user.role === 1 ? <AutoComplete
                        dropdownClassName="certain-category-search-dropdown"
                        style={{ width: '100%' }}
                        options={renderRepairmanOptions()}
                        allowClear={true}
                        onSelect={selectRepairmanItem}
                        onFocus={focusRepairmanInput}
                        value={repairmanSearch}
                        onPopupScroll={handScrollAutoComplete}
                    >
                        <Input size="middle" onChange={handleChangeRepairmanSearch} />
                    </AutoComplete> : <span>{repairmanSearch !== null && repairmanSearch !== "" && repairmanSearch !== undefined ? repairmanSearch : "--" }</span>}
                </Form.Item>

                <Form.Item
                    label="Màu xe:"
                    name="txtColor"
                    labelAlign="left"
                >

                    {user.role !== 1 ? <span>{info.color !== null ? info.color : "--"}</span> :
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            options={colors}
                            onSelect={handleSelectColor}
                        >
                            <Input size="middle" onChange={changeInput} name='color' />
                        </AutoComplete>}


                </Form.Item>
                <Form.Item
                    label="Loại xe:"
                    name="txtModel"
                    labelAlign="left"
                >
                    {user.role !== 1 ? <span>{info.model !== null ? info.model : "--"}</span> :
                        <Input size="middle" onChange={changeInput} name='model' />}


                </Form.Item>
                <Form.Item
                    label="Nhân viên điều phối:"
                    name="txtCoordinator"
                    labelAlign="left"
                >
                    <span>{coordinator.fullName}</span>
                </Form.Item>
                <Form.Item
                    label="Ngày trả xe:"
                    name="txtReturnDate"
                    labelAlign="left"
                >
                    {user.role !== 1 ? <span>{info.returnDate === null ? "--" : formatDate(info.returnDate)}</span> :
                        <DatePicker showTime placeholder='' onChange={changeInput} name='returnDate' />}

                </Form.Item>
                <Form.Item
                    label="Mô tả:"
                    name="txtDescription"
                    labelAlign="left"
                >
                    {user.role !== 1 ? <span>{info.description !== null ? info.description : "--"}</span> :
                    <Input.TextArea onChange={changeInput} name='description' />}
                    
                </Form.Item>
            </Form>

        </Row>

    );
}

export default MaintenanceCardInfo;