
import { AutoComplete, Button, DatePicker, Empty, Form, Input, Row, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { formatDate } from '../../../utils/DateFormat'
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { formatPlate } from '../../../utils/PlatesNumberFormat'
import { PhoneOutlined, TagsFilled, TagsOutlined } from '@ant-design/icons';
import { StoreOutlined } from '@material-ui/icons';
import { formatCurrentcy } from "../../../utils/FormatVND";
import {formatMonney} from "../../../utils/MonneyFormat";

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
};




const Info = (props) => {

    const [focus, setForcus] = useState(false);
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
        returned:false
    });
    const [form] = Form.useForm();



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
    const { maintenanceCardAddActionCreators } = props;
    const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
    const { actUpdateMaintenanceCard } = maintenanceCardAddActionCreators;
    const [modelBike, setModelBike] = useState([]);
    const [colorBike, setColorBike] = useState([]);


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
    }, [ props.maintenanceCardAdd.id]);
    useEffect(() => {
        setCoupons(props.maintenanceCardAdd.coupon);
    }, [props.maintenanceCardAdd.coupon, couponsCurrentPage, couponsSearch, couponSize])
    //repairman

    useEffect(() => {
        setReturned(props.maintenanceCardAdd.info.returned);
    }, [props.maintenanceCardAdd.info.returned]);



    useEffect(() => {

        setEdit(props.maintenanceCardAdd.repairman.edit)
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)

    }, [props.maintenanceCardAdd.repairman.user, props.maintenanceCardAdd.repairman]);
    //repairman

    useEffect(() => {
        if (props.maintenanceCardAdd.id !== 0) {
            setCoordinator(props.maintenanceCardAdd.coordinator)
        }
        else {
            setCoordinator(props.user)
        }
        setId(props.maintenanceCardAdd.id)
        setUser(props.user)
    }, [props.user, props.maintenanceCardAdd.coordinator, props.maintenanceCardAdd.id]);

    // useEffect(() => {
    //
    //         setInfo(props.maintenanceCardAdd.info);
    //     // }
    // }, [props.maintenanceCardAdd.id, props.maintenanceCardAdd.check, props.user]);
    //repairman
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
        const { maintenanceCardAddActionCreators } = props;
        const { actFetchDataStore } = maintenanceCardAddActionCreators;
        actFetchDataStore(currentStore, sizeStore, "", "", "")
    }
    const renderStoreItem = (store) => {
        return {
            value: store.id.toString(),
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <StoreOutlined /> <span>{store.name}</span>
                    </div>
                    <div>
                        <PhoneOutlined /> {store.phone}
                    </div>
                </div>
            ),
        };
    }

    const renderItemCoupons = (coupon) => {

        return {
            value: coupon.id.toString(),
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <StoreOutlined /> <span>{coupon.name}-Giảm {formatCurrentcy(coupon.discount)}-Số lượng: {coupon.quantity}</span>
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





    const submitFailedForm = (values) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
        actCreateMaintenanceCard(values, false)
    }
    React.useEffect(() => {
        // form.setFields(null);
        form.setFieldsValue({
            returned:info.returned,
            txtCode:info.code,
            txtColor:info.colorBike,
            Store:info.store
        })
    }, [info]);


    const renderFields = () => {
        return [
            {
                name: 'returned',
                value: info.returned,
            }
            ,
            {
                name: 'manufacture',
                value: info.colorBike.modelBike.manufacture.id !=null && info.colorBike.modelBike  != undefined ? info.colorBike.modelBike.manufacture.name : '',
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

    const changeInput = (e) => {
        console.log(e.target.value);
        let target = e.target;

        if (target !== null && target !== undefined) {
            let a = { ...info };
            a[target.name] = target.value;

            setInfo(a)
        }

    }

    const handleChangeReturned = (value) => {
        setInfo({...info,returned: value})
        setReturned(value);
        setReturnBike(value);
        actUpdateMaintenanceCard(info);
    }
    console.log(info)
if(props.maintenanceCardAdd.payStatus ==1 ){
    return (
        <Row>
            <Form

                ref={formRef}
                {...layout}
                name="aajajjaaj"
                style={{ width: '100%' }}

                fields={renderFields()}
                initialValues={renderFields()}

                layout="vertical"

            >
                <Form.Item
                    label="Mã"
                    name="txtCode"
                    labelAlign="left"
                    wrapperCol={100}
                >

                    {props.maintenanceCardAdd.info.code != null ?<>   {props.maintenanceCardAdd.info.code.toUpperCase()}

                        </>:

                        <>---</> }
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
                    validateTrigger={["onBlur"]}
                    wrapperCol={100}
                >

                    {props.maintenanceCardAdd.info.platesNumber != null ?<>   {props.maintenanceCardAdd.info.platesNumber}

                        </>:

                        <>---</> }
                </Form.Item>

                <Form.Item
                    label="Cửa hàng sửa chữa"
                    name="Store"
                    labelAlign="left"
                    wrapperCol={150}
                    rules={[{ required: true, message: 'Vui lòng chọn cửa hàng sửa chữa!' }]}
                >

                    {props.maintenanceCardAdd.info.store != null ?<>
                            <p>Tên cửa hàng: {props.maintenanceCardAdd.info.store.name}</p>
                            <p>Địa chỉ : {props.maintenanceCardAdd.info.store.address}</p>
                        </>:

                        <>---</> }

                </Form.Item>
                <Form.Item
                    label="Hãng xe:"
                    name="manufacture"
                    labelAlign="left"
                    wrapperCol={100}
                >


                    {props.maintenanceCardAdd.info.colorBike != null ?<>   {props.maintenanceCardAdd.info.colorBike.modelBike.manufacture.name}  </>:<>---</> }


                </Form.Item>
                <Form.Item
                    label="Loại xe:"
                    name="txtModel"
                    labelAlign="left"
                    wrapperCol={100}
                >


                    <p>
                        {props.maintenanceCardAdd.info.colorBike.modelBike != null ?<>   {props.maintenanceCardAdd.info.colorBike.modelBike.name}  </>:<>---</> }
                    </p>
                </Form.Item>
                <Form.Item
                    label="Màu xe:"
                    name="txtColor"
                    labelAlign="left"
                    wrapperCol={100}
                >


                    <p>
                        {props.maintenanceCardAdd.info.colorBike != null?<>   {props.maintenanceCardAdd.info.colorBike.name}  </>:<>---</> }
                    </p>


                </Form.Item>

                <Form.Item style={{ width: '100%' }}
                           label="Người điều phối:"
                           name="txtCoordinator"
                           labelAlign="left"
                           wrapperCol={100}
                >
                    {user.role != 2 ? <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => window.open(`/admin/employees/${coordinator.id}`, "_blank")}>{coordinator.fullName}</span> : <span>{coordinator.fullName}</span>}
                </Form.Item>
                {props.maintenanceCardAdd.info.returned != undefined ?
                    <>

                        <div style={{ marginBottom: 25 }}>
                            <div class="" title="Trạng thái trả xe:">Trạng thái trả xe:  {returned ? <><Tag color='success'>Đã trả xe</Tag></> : <> Đang sửa</>}
                            </div>
                            <br />

                        </div>

                    </> : <></>}


                <Form.Item
                    label="Phiếu giảm giá:"
                    name="Coupon"
                    labelAlign="left"
                    wrapperCol={100}
                >
                    {props.maintenanceCardAdd.info.coupon != null?<>Giảm {formatMonney(props.maintenanceCardAdd.info.coupon.discount)} đ</>:<>---</> }




                </Form.Item>
                <Form.Item
                    label="Mô tả:"
                    name="txtDescription"
                    labelAlign="left"
                    wrapperCol={100}
                >

                    {/*<span>{info.description !== null ? info.description : "--"}</span>  */}
                    <Input.TextArea  name='description' />

                </Form.Item>


            </Form>

        </Row>

    );
}else{
    return(<></>);
}

}

export default Info;