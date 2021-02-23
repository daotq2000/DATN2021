import {
    AutoComplete,
    Button,
    DatePicker,
    Empty,
    Form,
    Input,
    message,
    Modal,
    Popconfirm,
    Row,
    Spin,
    Switch,
    Tag
} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {formatDate} from '../../../utils/DateFormat'
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import {formatPlate} from '../../../utils/PlatesNumberFormat'
import {PhoneOutlined, TagsFilled, TagsOutlined} from '@ant-design/icons';
import {StoreOutlined, TagFacesOutlined} from '@material-ui/icons';
import {formatCurrentcy} from "../../../utils/FormatVND";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Layout from '../../Layout/index';
import './form.css';
import {formatMonney} from "../../../utils/MonneyFormat";
import {actCommentDelete, actUpdateReturned} from "../../../actions/maintenanceCardAdd";

const layout = {
    labelCol: {span: 12},
    wrapperCol: {span: 12},
};


const MaintenanceCardInfo = (props) => {

    const [form] = Form.useForm();

    function confirm(e) {
        const {maintenanceCardAddActionCreators} = props;
        const {actUpdateReturned} = maintenanceCardAddActionCreators;
        debugger
        console.log(actUpdateReturned)
        actUpdateReturned(true);
        setTimeout(() => {
            handleChangeReturned(true);
        }, 1000)
    }


    function cancel(e) {
        console.log(e);
        message.error('Click on No');
    }

    const [visiblePickDate, setVisiblePickDate] = useState(false);
    const [focus, setForcus] = useState(false);
    const [commentDelete, setCommentDelete] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [couponsCurrentPage, setCouponsCurrentPage] = useState(1);
    const [couponsSearch, setSearchCoupon] = useState("");
    const [couponSize, setCouponSize] = useState(10);
    const [coupon, setCoupon] = useState({});

    const [returned, setReturned] = useState(false);
    const [info, setInfo] = useState({
        coupon: null,
        store: null,
        colorBike: {
            id: null,
            modelBike: {
                id: null,
                manufacture: {
                    id: null,
                }
            }
        },
        returned: false,
        returnDateCustomer: null
    });


    const [id, setId] = useState(0);
    const [coordinator, setCoordinator] = useState({});
    const [edit, setEdit] = useState(false);
    //repairman
    const [lisRepairman, setLisRepairman] = useState([]);
    const [repairmanSearch, setRepairmanSearch] = useState('');
    const [repairmanPage, setRepairmanPage] = useState(0);
    const [totalRepairman, setTotalRepairman] = useState(0);
    //repairman
    const [store, setStore] = useState([]);
    const [currentStore, setCurrentStore] = useState(1);
    const [totalStore, setTotalStore] = useState(1);
    const [sizeStore, setSizeStore] = useState(10);
    const [storeSearch, setStoreSearch] = useState("");
    const [idParam, setIdParam] = useState(0);
    const [returnBike, setReturnBike] = useState(false);

    const [manufacturer, setManufacturer] = useState([]);
    const [manufacturerPage, setManufacturerPage] = useState(1);
    const [manufacturerSize, setManufacturerSize] = useState(10);
    const [manufacturerSearch, setManufacturerSearch] = useState('');
    const {maintenanceCardAddActionCreators} = props;
    const {actCreateMaintenanceCard} = maintenanceCardAddActionCreators;
    const {actUpdateMaintenanceCard} = maintenanceCardAddActionCreators;
    const [modelBike, setModelBike] = useState([]);
    const [colorBike, setColorBike] = useState([]);
    const [returnDateCustomer, setReturnDateCustomer] = useState(null);
    const {actCommentDelete} = maintenanceCardAddActionCreators;

    const [user, setUser] = useState({
        role: 0
    });


    const formRef = React.createRef();

    useEffect(() => {
        setManufacturer(props.maintenanceCardAdd.manufacture)
    }, [props.maintenanceCardAdd.manufacture, manufacturerPage, manufacturerSize])
    useEffect(() => {
        if (props.maintenanceCardAdd.manufacturePage !== undefined) {
            setManufacturerPage(props.maintenanceCardAdd.manufacturePage);
        }
    }, [props.maintenanceCardAdd.manufacturerPage])
    useEffect(() => {
        setModelBike(props.maintenanceCardAdd.modelBike);
    }, [props.maintenanceCardAdd.modelBike])
    useEffect(() => {
        setColorBike(props.maintenanceCardAdd.colorBike);
    }, [props.maintenanceCardAdd.colorBike])

    useEffect(() => {
        setReturnBike(props.maintenanceCardAdd.info.returned)
    }, [props.maintenanceCardAdd.info.returned, props.idParam, props.maintenanceCardAdd.id])

    useEffect(() => {
        setInfo(props.maintenanceCardAdd.info);
    }, [props.maintenanceCardAdd.id]);
    useEffect(() => {
        setCoupons(props.maintenanceCardAdd.coupon);
    }, [props.maintenanceCardAdd.coupon, couponsCurrentPage, couponsSearch, couponSize])
    //repairman

    useEffect(() => {
        setReturned(props.maintenanceCardAdd.info.returned);
    }, [props.maintenanceCardAdd.info.returned]);

    // useEffect(()=>{
    //     const {maintenanceCardAddActionCreators} = props;
    //     const {actCommentDelete} = maintenanceCardAddActionCreators;
    //     actCommentDelete(commentDelete);
    //
    // },[commentDelete])
    useEffect(() => {

        setEdit(props.maintenanceCardAdd.repairman.edit)
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)

    }, [props.maintenanceCardAdd.repairman.user, props.maintenanceCardAdd.repairman]);
    //repairman

    useEffect(() => {
        if (props.maintenanceCardAdd.id !== 0) {
            setCoordinator(props.maintenanceCardAdd.coordinator)
        } else {
            setCoordinator(props.user)
        }
        setId(props.maintenanceCardAdd.id)
        setUser(props.user)
    }, [props.user, props.maintenanceCardAdd.coordinator, props.maintenanceCardAdd.id]);

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
    //repairman
    useEffect(() => {
        setStore(props.maintenanceCardAdd.stores);
    }, [props.maintenanceCardAdd.stores, currentStore, sizeStore]);


    const renderStore = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchDataStore} = maintenanceCardAddActionCreators;
        actFetchDataStore(currentStore, sizeStore, "", "", "")
    }
    const renderStoreItem = (s) => {

        return {
            value: s.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <StoreOutlined/> <span>{s.name}</span>
                    </div>
                    <div>
                        <PhoneOutlined/> {s.phone}
                    </div>
                </div>
            ),
        };
    }

    const renderStoreOptions = () => {
        let rs = [];
        rs = store.map((val) => {
            {
                return (renderStoreItem(val));
            }
        })
        return [
            {
                label: 'Thông tin cửa hàng',
                options: rs
            }
        ]
    }
    const renderManufactureItem = (manufacture) => {
        return {
            value: manufacture.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <StoreOutlined/> Hãng xe - <span>{manufacture.name}</span>
                    </div>

                </div>
            ),
        };
    }
    const renderModelBikeItem = (modelBike) => {
        return {
            value: modelBike.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span>{modelBike.name}</span>
                    </div>

                </div>
            ),
        };
    }
    const renderOptionsModelBikeByManufactureId = () => {
        let rs = [];
        rs = modelBike.map((val) => {
            return renderModelBikeItem(val);
        })
        return [
            {
                label: 'Thông tin loại xe',
                options: rs
            }
        ]
    }
    const focusInputModelBike = () => {
        let manufacturerId = info.colorBike.modelBike.manufacture;
        if (manufacturerId != undefined) {
            const {maintenanceCardAddActionCreators} = props;
            const {actModelBike} = maintenanceCardAddActionCreators;
            actModelBike(manufacturerId.id);
        }
    }
    const chooseModelBikeByManufactorId = (value) => {
        modelBike.forEach((val) => {
            if (val.id == value) {
                setInfo({
                    ...info,
                    colorBike: {
                        id: null,
                        modelBike: val
                    }

                })
            }
        })
    }
    const chooseColorBikeByModelBikeId = (value) => {
        colorBike.forEach((val) => {
            if (val.id == value) {
                setInfo({
                    ...info,
                    colorBike: val
                })
            }
        })
    }

    const renderOptionsManufacture = () => {
        let rs = [];
        rs = manufacturer.map((val) => {
            return renderManufactureItem(val);
        })
        return [
            {
                label: 'Thông tin hãng xe',
                options: rs
            }
        ]
    }
    const focusManufactureInput = () => {
        console.log('alo');
        const {maintenanceCardAddActionCreators} = props;
        const {actGetManufacture} = maintenanceCardAddActionCreators;
        actGetManufacture(manufacturerPage, manufacturerSize, '', '', '')
    }
    const renderItemColorBike = (colorBike) => {
        return {
            value: colorBike.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span>{colorBike.name}</span>
                    </div>

                </div>
            ),
        };
    }
    const renderOptionsColorBike = () => {
        let rs = [];
        rs = colorBike.map((val) => {
            return renderItemColorBike(val);
        })
        return [
            {
                label: 'Thông tin màu xe',
                options: rs
            }
        ]
    }
    const focusColorBikeInput = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actColorBike} = maintenanceCardAddActionCreators;
        if (info.colorBike.modelBike != undefined && info.colorBike.modelBike != null) {
            let modelBikeId = info.colorBike.modelBike.id;
            actColorBike(modelBikeId);
        }
    }
    const chooseManufacture = (value) => {

        manufacturer.forEach((val) => {

            if (val.id == value) {

                setInfo({...info, colorBike: {modelBike: {manufacture: val}}});
            }
        })
    }

    const chooseCoupon = (value) => {

        if (value != undefined) {
            coupons.forEach((val) => {
                if (value == val.id) {
                    setSearchCoupon(val.name);
                    setInfo({...info, coupon: val})

                }

            })
        }
    }

    const chooseStore = (value) => {
        if (value != undefined) {
            store.forEach((val) => {
                if (value == val.id) {
                    console.log(val)
                    setStoreSearch(val.name);
                    setInfo({...info, store: val})
                    // setForm({ ...form, store: val })
                }
            })
        }

    }

    const forcusCouponInput = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchCoupon} = maintenanceCardAddActionCreators;
        setForcus(true);
        actFetchCoupon(couponsCurrentPage, couponSize, "", "", "");
    }
    const renderItemCoupons = (coupon) => {

        return {
            value: coupon.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <StoreOutlined/>
                        <span>{coupon.name}-Giảm {formatCurrentcy(coupon.discount)}-Số lượng: {coupon.quantity}</span>
                    </div>

                </div>
            ),
        };
    }
    const renderOptionsCoupons = () => {
        let rs = [];

        if (coupons != undefined) {
            rs = coupons.map((val, index) => {
                return (renderItemCoupons(val));
            })
            return [
                {
                    lable: <>Mã phiếu giảm giá</>,
                    options: rs
                }
            ]
        }
        return rs;
    }


    const submitForm = (values) => {


        if (id === 0 || id === undefined) {
            actCreateMaintenanceCard(info, true)
        } else {
            actUpdateMaintenanceCard(info);
        }
    }


    const submitFailedForm = (values) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actCreateMaintenanceCard} = maintenanceCardAddActionCreators;
        actCreateMaintenanceCard(values, false)
    }


    const renderFields = () => {
        // if(commentDelete != null && commentDelete.length > 10){
        //     console.log("send")
        //     actCommentDelete(commentDelete);
        // }

        return [
            {
                name: 'txtReturnDateCustomer',
                value: info.returnDateCustomer == "" || info.returnDateCustomer == null ? "" : moment(info.returnDateCustomer)
            },
            {
                name: 'returned',
                value: returned,
            }
            ,
            {
                name: 'manufacture',
                value: info.colorBike.modelBike.manufacture.id != null && info.colorBike.modelBike != undefined ? info.colorBike.modelBike.manufacture.name : '',
            },
            {
                name: 'Store',
                value: info.store != null ? info.store.name : '',
            },
            {
                name: 'Coupon',
                value: info.coupon != null ? info.coupon.name : '',
            },
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
                value: info.code !== undefined && info.code !== null ? info.code.toUpperCase() : "",
            },
            {
                name: 'txtPlatesNumber',
                value: info.platesNumber != null ? info.platesNumber : '',
            },
            {
                name: 'txtColor',
                value: info.colorBike.id != null ? info.colorBike.name : '',
            },
            {
                name: 'txtModel',
                value: info.colorBike.modelBike.id != null ? info.colorBike.modelBike.name : '',
            },
            ,
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
    const onOK = () => {
        setVisiblePickDate(!visiblePickDate)
        setInfo({...info, returnDateCustomer: returnDateCustomer});

    }
    const openPickDate = (e) => {
        setVisiblePickDate(!visiblePickDate)
        if (e.target == null && e.target == undefined) {
            setReturnDateCustomer(e._d);
        }
    }
    const closePickDate = e => {
        setVisiblePickDate(!visiblePickDate);
        setReturnDateCustomer(null);
        setInfo({...info, returnDateCustomer: null})
    }

    const changeInput = (e) => {
        let count = 1;
        let target = e.target;

        if (target !== null && target !== undefined) {
            let a = {...info};
            a[target.name] = target.value;
            if (target.name == 'description') {


                setCommentDelete(target.value);
                if(commentDelete != null && commentDelete.length > 10){
                    console.log("send")
                    actCommentDelete(commentDelete);
                }


            }
            setInfo(a)
        } else {
            setVisiblePickDate(true);
            let a = {...info};
            a["returnDateCustomer"] = e._d;
            setInfo(a)
        }
        // if(commentDelete > 10){
        //     actCommentDelete(commentDelete);
        // }
    }

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDateTime() {

        let now = new Date();

        return {
            disabledHours: () => range(0, 24).splice(0, now.getHours()),

        };
    }

    const date = new Date();
    const handleChangeReturned = (value) => {
        setInfo({...info, returned: value})
        setReturned(value);
        setReturnBike(value);
        actUpdateMaintenanceCard(info);
    }


    return (
        <>
            <Row>

                <Form

                    ref={formRef}
                    {...layout}
                    name="maintenanceCardInfo"
                    style={{width: '100%'}}
                    onFinish={submitForm}
                    fields={renderFields()}
                    initialValues={renderFields()}
                    onFinishFailed={submitFailedForm}
                    layout="vertical"

                >
                    <Form.Item
                        label="Mã"
                        name="txtCode"
                        labelAlign="left"
                        wrapperCol={100}
                    >
                        {user.role === 2 || props.maintenanceCardAdd.info.returned == true ?
                            <span>{info.code !== undefined && info.code !== null ? info.code.toUpperCase() : ""}</span> :
                            <Input onChange={changeInput} name="code"/>}

                    </Form.Item>
                    <Form.Item
                        label="Biển số xe"
                        name="txtPlatesNumber"
                        rules={[{required: true, message: 'Vui lòng nhập biển số xe!'},
                            {
                                pattern: '[0-9]{2}[a-zA-Z]{1}[0-9]{5,6}',
                                max: 9,
                                message: 'Vui lòng nhập đúng định dạng biển số xe!',
                            }]}
                        labelAlign="left"
                        validateTrigger={["onBlur"]}
                        wrapperCol={100}
                    >
                        {props.maintenanceCardAdd.info.returned == true || user.role == 2 ? <> {props.maintenanceCardAdd.info.platesNumber}</> : <> {
                            <Input onChange={changeInput} value={info.platesNumber} name="platesNumber"/>}</>}


                    </Form.Item>
                    <div title="Cửa hàng sửa chữa">
                        <p>Cửa hàng sửa chữa</p>
                        <Form.Item
                            label=""
                            name="Store"
                            labelAlign="left"
                            wrapperCol={150}
                            rules={[{required: true, message: 'Vui lòng chọn cửa hàng sửa chữa!'}]}
                        >

                            {user.role === 2 || props.maintenanceCardAdd.info.returned == true ? props.maintenanceCardAdd.info.store != null ? props.maintenanceCardAdd.info.store.name : <><>------</>
                                    </> :
                                <AutoComplete
                                    dropdownClassName="certain-category-search-dropdown"
                                    options={renderStoreOptions()}
                                    onSelect={chooseStore}
                                    notFoundContent={"Không có dữ liệu"} locale={{
                                    emptyText: <Empty description="Không có dữ liệu"
                                                      image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                                }}
                                >
                                    <Input size="middle" onChange={changeInput} onFocus={renderStore} name='store'/>

                                </AutoComplete>}

                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Hãng xe:"
                        name="manufacture"
                        labelAlign="left"
                        wrapperCol={100}
                    >
                        {user.role === 2 || props.maintenanceCardAdd.info.returned == true ?
                            <span>{info.colorBike !== null ? info.colorBike.modelBike.manufacture.name : "--"}</span> :
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                options={renderOptionsManufacture()}
                                onSelect={chooseManufacture}
                            >
                                <Input size="middle" onFocus={focusManufactureInput} name='manufacture'/>
                            </AutoComplete>}


                    </Form.Item>
                    <Form.Item
                        label="Loại xe:"
                        name="txtModel"
                        labelAlign="left"
                        wrapperCol={100}
                    >
                        {user.role === 2 || props.maintenanceCardAdd.info.returned == true ?
                            <span>{info.colorBike.modelBike !== null ? info.colorBike.modelBike.name : "--"}</span> :
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                onSelect={chooseModelBikeByManufactorId}
                                options={renderOptionsModelBikeByManufactureId()}

                            >
                                <Input size="middle" onFocus={focusInputModelBike} name='model'/>
                            </AutoComplete>}


                    </Form.Item>
                    <Form.Item
                        label="Màu xe:"
                        name="txtColor"
                        labelAlign="left"
                        wrapperCol={100}
                    >

                        {user.role === 2 || props.maintenanceCardAdd.info.returned == true ?
                            <span>{info.colorBike !== null ? info.colorBike.name : "--"}</span> :
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                options={renderOptionsColorBike()}
                                onSelect={chooseColorBikeByModelBikeId}
                            >
                                <Input size="middle" onFocus={focusColorBikeInput} name='color'/>
                            </AutoComplete>}


                    </Form.Item>

                    <Form.Item style={{width: '100%'}}
                               label="Người điều phối:"
                               name="txtCoordinator"
                               labelAlign="left"
                               wrapperCol={100}
                    >
                        {user.role != 2 ? <span style={{color: '#1890ff', cursor: 'pointer'}}
                                                onClick={() => window.open(`/admin/employees/${coordinator.id}`, "_blank")}>{coordinator.fullName}</span> :
                            <span>{coordinator.fullName}</span>}
                    </Form.Item>


                    <Form.Item
                        label="Phiếu giảm giá:"
                        name="Coupon"
                        labelAlign="left"
                        wrapperCol={100}
                    >
                        {props.maintenanceCardAdd.payStatus != 1 ?
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                options={renderOptionsCoupons()}
                                onSelect={chooseCoupon}
                            >
                                <Input size="middle" prefix={<TagsFilled style={{color: 'red'}}/>}
                                       onFocus={forcusCouponInput} name='coupon'/>


                            </AutoComplete> : <>{props.maintenanceCardAdd.info.coupon != null ? <>Giảm {formatMonney(props.maintenanceCardAdd.info.coupon.discount)} đ</> : <>---</>}</>}


                    </Form.Item>
                    {props.maintenanceCardAdd.payStatus != 1 || props.maintenanceCardAdd.returned == false ?
                        <Form.Item
                            label="Ghi chú:"
                            name="txtDescription"
                            labelAlign="left"
                            wrapperCol={100}
                        >
                            <Input.TextArea onChange={changeInput} name='description'/>
                        </Form.Item>
                        :
                        <span>{info.description !== null ? info.description : "--"}</span>}


                </Form>

            </Row>

            {props.maintenanceCardAdd.info.returned != undefined && user.role != 2 ?
                <>

                    <div style={{marginBottom: 25}}>
                        <div class="" title="Trạng thái trả xe:">Trạng thái trả xe: {returned ? <><Tag
                                color='success'>Đã trả xe</Tag></> :


                            <>
                                <Popconfirm
                                    title="Xác nhận trả xe?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Trả xe"
                                    cancelText="Đóng"

                                >
                                    <Switch> Đang sửa</Switch>
                                </Popconfirm>
                            </>

                        }
                        </div>
                    </div>

                </> : <></>}

            <Form.Item
                label="Ngày hẹn giao:"
                name="txtReturnDateCustomer"
                labelAlign="left"
                style={{width: '100%'}}
                wrapperCol={100}
            >
                {user.role != 2 || (props.maintenanceCardAdd.returnDateCustomer == null) ?
                    <DatePicker allowClear={false}
                                style={{width: '100%'}}
                                disabledDate={d => !d || d.isBefore(moment())}
                                disabledTime={disabledDateTime}
                                showTime={{hideDisabledOptions: true,}}
                                value={''}
                                format="HH:mm DD/MM/yyyy"
                                placeholder='' onChange={openPickDate} name='txtReturnDateCustomer'
                                locale={{...locale, lang: {...locale.lang, ok: "Chọn"}}}/>
                    : <>{formatDate(info.returnDateCustomer)}</>
                }

            </Form.Item>
            <Modal
                title="Xác nhận hẹn giao "
                visible={visiblePickDate}
                onOk={onOK}
                onCancel={closePickDate}
                okText='Xác nhận'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={false} delay={500}>
                    Bạn có chắc chắn đây là thời gian hẹn giao?
                </Spin>
            </Modal>
        </>
    );
}

export default MaintenanceCardInfo;