import {CloseOutlined} from "@ant-design/icons";
import {AutoComplete, Empty, Input, message, Row, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import FormatTime from "../../../utils/FormatTime";
import {formatMonney} from "../../../utils/MonneyFormat";
import {Switch} from 'antd'
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from '@ant-design/icons';

const Service = (props) => {

    const columns = [
        {
            title: 'Mã dịch vụ',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        }
        ,
        {
            title: 'Thời gian sửa',
            dataIndex: 'timeWork',
            key: 'timeWork',
            render: (text, data) => <>{FormatTime(data.time)}</>
        },
        {
            title: 'Bảo hành',
            dataIndex: 'timeGuarantee',
            key: 'timeGuarantee',
            render: (text) => <>{text} tháng</>
        }
        ,
        props.maintenanceCardAdd.payStatus != 1 ? (
            {
                title: 'Tặng kèm',
                dataIndex: 'isFree',
                key: 'isFree',
                render: (isFree, data) => {
                    return (
                        <Switch onClick={(e) => {
                            setServiceFree(data.id, e)
                            console.log(props.maintenanceCardAdd.payStatus)
                        }} defaultChecked={data.free}/>
                    )
                }
            }) : <></>
        ,
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price, data) =>
                <>{formatMonney(data.price)}đ</>

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status, data) => {
                // handleChangeStatus(data.maintenanceCardDetailId, status)
                if (data.workStatus === 0 || data.workStatus === undefined) {
                    return (
                        <Tag color="warning"
                             style={{cursor: "pointer"}}
                             onClick={() => handleChangeStatus(data.maintenanceCardDetailId, data.workStatus)}>Đang
                            chờ</Tag>
                    )
                } else if (data.workStatus === 1) {
                    // handleChangeStatus(data.maintenanceCardDetailId, status)
                    return (
                        <Tag color="processing"
                             style={{cursor: "pointer"}}
                             onClick={() => handleChangeStatus(data.maintenanceCardDetailId, data.workStatus)}>Đang
                            sửa</Tag>
                    )
                } else if (data.workStatus === 2) {
                    return (
                        <Tag color="success"
                             onClick={() => handleChangeStatus(data.maintenanceCardDetailId, data.workStatus)}>Hoàn
                            thành</Tag>

                    )
                }

            }
        },

        (props.maintenanceCardAdd.workStatus != 2 || props.maintenanceCardAdd.workStatus != undefined) && props.maintenanceCardAdd.payStatus != 1 ? (
            {
                title: '',
                dataIndex: 'id',
                key: 'id',
                width: '5%',
                render: (status, data) => <>{props.maintenanceCardAdd.info.returned ? <></> : data.workStatus == 2 ? <></> : <>
                    <CloseOutlined onClick={() => {
                        deleteService(data.id)
                    }} style={{color: 'red'}}/></>}</>
            }) : <></>

    ];

    const [data, setData] = useState([]);
    const [servicePage, setServicePage] = useState(1);
    const [totalServicePage, setTotalServicePage] = useState(0);
    const [size, setSize] = useState(10);
    const [isShowAuto, setIsShowAuto] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [error, setError] = useState(false);
    const [listServices, setlistServices] = useState([]);
    const [search, setSearch] = useState('');
    const [alowClear, setAllowClear] = useState(false);
    const [sumMantainanceCard, setSumMantainanceCard] = useState(0);
    const [reset, setReset] = useState(false);
    //  useEffect

    useEffect(() => {
        setData(props.services);
    }, [props.services, search, servicePage, size, sumMantainanceCard, reset]);
    useEffect(() => {
        setTotalServicePage(props.maintenanceCardAdd.totalServicePage);
    }, [totalServicePage, props.maintenanceCardAdd.totalServicePage])

    useEffect(() => {
        if (props.maintenanceCardAdd.currentServicePage !== undefined) {
            setServicePage(props.maintenanceCardAdd.currentServicePage)
        } else {
            setServicePage(1);
        }

    }, [props.maintenanceCardAdd.currentServicePage, servicePage])
    useEffect(() => {
        setlistServices(props.listService)
    }, [props.listService])
    useEffect(() => {
        setAllowClear(alowClear);
    }, [alowClear])
    useEffect(() => {
        setSumMantainanceCard(props.sumMantainanceCard);
    }, [props.sumMantainanceCard])
    // functional

    const focusInput = () => {
        setIsShowAuto(true)
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchListDataService} = maintenanceCardAddActionCreators;
        actFetchListDataService(servicePage, size, "", "", search);
    }
    const setServiceFree = (id, value) => {
        console.log(value)
        console.log(id);
        // listServices[id].isFree = value;
        listServices.forEach(value1 => {
            if (value1.id == id) {
                value1.free = value;
                console.log(value1)
            }
        })
    }
    const handleChangeStatus = (id, status) => {
        setReset(!reset);
        if (props.maintenanceCardAdd.id != 0) {
            if (status < 2) {

                const {maintenanceCardAddActionCreators} = props;
                const {actUpdateStatusDetail} = maintenanceCardAddActionCreators;
                actUpdateStatusDetail(id);

            } else {
                message.warning('Không thể thay đổi trạng thái khi đã hoàn thành')
            }
        }
    }
    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalServicePage > servicePage) {
                const {maintenanceCardAddActionCreators} = props;
                const {actUpdateListService} = maintenanceCardAddActionCreators;
                if (search === undefined || search === "") {
                    actUpdateListService("")
                } else {

                    actUpdateListService(search)
                }
            }
        }
    }
    const renderItem = (service) => {

        return {
            value: service.id.toString(),
            label: (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>


                    <div>
                        <div style={{fontWeight: 'bold'}}> {service.exist ? <CheckCircleOutlined style={{color:"green",fontSize:'20px'}}/>:<></>} {service.name}</div>
                        <div>{service.code.toUpperCase()} - Giá: {service.price} đ</div>
                    </div>

                    <div style={{textAlign: 'right'}}>

                        Thời gian : {FormatTime(service.time)}
                        <div>Dịch vụ</div>
                    </div>
                </div>
            ),
        };
    };
    const chooseService = (id) => {
        setAllowClear(true);
        const {maintenanceCardAddActionCreators} = props;
        const {actChooseService} = maintenanceCardAddActionCreators;
        const {actCalculateSumMaintenanceCard} = maintenanceCardAddActionCreators;
        const {actCalculateTotalTimeService} = maintenanceCardAddActionCreators;


        data.forEach((value) => {
            if (value.id == id) {

                actChooseService(value);
                actCalculateTotalTimeService(value.time)

            }
        })

        //   console.log(sumMantainanceCard);
    }
    const checkExists = (id) => {
        let index = -1;
        data.forEach((val) => {
            if (val.id == id) {

                index = id;
            }
        })
        return index;
    }
    const deleteService = (id) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actRemoveService} = maintenanceCardAddActionCreators;
        actRemoveService(id);
    }
    const handleSearch = (e) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchListDataService} = maintenanceCardAddActionCreators;

        if (e.target.value == null | e.target.value === "") {
            actFetchListDataService(servicePage, size, "", "", search);
        }
        setSearch(e.target.value);
        setTimeout(() => {

            actFetchListDataService(servicePage, size, "", "", search);
        }, 200);


    }
    const renderOptions = () => {
        let resullt = [];
        resullt = data.map((val) => {
            listServices.map((e) => {
                if(val.id == e.id){
                    val.exist = true;
                }
            })
            console.log(val)
            return (renderItem(val));
        })

        return [
            {
                label: 'Thông tin dịch vụ',
                options: resullt
            }
        ]
    }

    const renderTable = () => {

        let rs = [];

        rs = listServices.map((val) => {

            return {
                ...val,
                code: val.code,
                key: val.id,
                price: val.price,
                timeGuarantee: val.timeGuarantee,
                timeWork: val.time
            }
        })
        return rs;
    }

    return (

        <>
            {props.user.role !== 2 && (props.maintenanceCardAdd.info.returned != true) ? (<>
                <Row>
                    {data != undefined ? (
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={500}
                            style={{
                                width: '100%',
                            }}
                            options={renderOptions()}
                            onSelect={chooseService}
                            onBlur={() => {
                                setSearch("")
                            }}
                            allowClear={alowClear}
                            value={search}
                            onPopupScroll={handScrollAutoComplete}

                        >
                            <Input.Search onFocus={focusInput} size="large" onChange={handleSearch}
                                          placeholder="Tìm kiếm dịch vụ"/>
                        </AutoComplete>
                    ) : <Input.Search onFocus={focusInput} size="large" placeholder="Tìm kiếm dịch vụ"/>}
                </Row></>) : (<></>)}

            <Row>
                <Table locale={{
                    emptyText: <Empty description='Không có dịch vụ' image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                }}

                       dataSource={renderTable()} columns={columns} style={{width: '100%', minHeight: '240px'}}
                       pagination={false}/>
            </Row>
        </>
    );

}
export default Service;