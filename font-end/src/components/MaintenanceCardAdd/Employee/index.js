import {CloseOutlined, CodeOutlined, PlusOutlined, SyncOutlined, UserOutlined} from '@ant-design/icons';
import {WatchOutlined} from '@material-ui/icons';
import {AutoComplete, Button, Col, Input, Row} from 'antd';
import React, {useState, useEffect} from 'react';
import {actFetchSuggestRepairManSuccess} from "../../../actions/maintenanceCardAdd";
import axiosService from '../../../utils/axiosService';
import {formatHourAndMinute} from '../../../utils/formatTimeMaintenanceCard'
import moment from 'moment';

const EmployeeSuggest = props => {

    const [lisRepairman, setLisRepairman] = useState([]);
    const [repairmanSearch, setRepairmanSearch] = useState('');
    const [repairmanPage, setRepairmanPage] = useState(0);
    const [totalRepairman, setTotalRepairman] = useState(0);
    const [employee, setEmployee] = useState({});
    const [edit, setEdit] = useState(false);
    const [closeRemove, setCloseRemove] = useState(false);
    const [close, setClose] = useState(false);
    const [error, setError] = useState(false);
    const [repairManItem, setRepairManItem] = useState({});
    const [minMaintenanceCard, setMinMaintenanceCard] = useState({});
    const [onSelect, setOnSelect] = useState(false);
    useEffect(() => {
        setMinMaintenanceCard(props.maintenanceCardAdd.minTime);
    }, [props.maintenanceCardAdd.minTime, onSelect])
    useEffect(() => {
        setRepairManItem(props.repairManItem);
    }, [props.repairManItem])
    useEffect(() => {

        setEdit(props.maintenanceCardAdd.repairman.edit)
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)

    }, [props.maintenanceCardAdd.repairman.user, props.maintenanceCardAdd.repairman]);
    useEffect(() => {
        setError(props.maintenanceCardAdd.error.repairmanError);
    }, [props.maintenanceCardAdd.error.repairmanError])
    useEffect(() => {
        setCloseRemove(props.maintenanceCardAdd.close);
    }, props.maintenanceCardAdd.close)
    useEffect(() => {
        setRepairmanPage(props.maintenanceCardAdd.repairmanPage)
    }, [props.maintenanceCardAdd.repairmanPage]);
    useEffect(() => {

        setEmployee(props.maintenanceCardAdd.worker);

    }, [props.maintenanceCardAdd.worker])
    useEffect(() => {
        setTotalRepairman(props.maintenanceCardAdd.totalRepairman)
    }, [props.maintenanceCardAdd.totalRepairman]);
    useEffect(() => {
        setLisRepairman(props.maintenanceCardAdd.listRepairman)
    }, [props.maintenanceCardAdd.listRepairman]);
    useEffect(() => {
        setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)
    }, [props.maintenanceCardAdd.repairman]);


    const selectRepairmanItem = (value) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actChooseRepairman} = maintenanceCardAddActionCreators;
        const {actGetMinTimeLeftEmployee} = maintenanceCardAddActionCreators;
        actChooseRepairman(value)
        actGetMinTimeLeftEmployee(value);
        setRepairmanSearch("");
    }

    const focusRepairmanInput = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actSearchRepairman} = maintenanceCardAddActionCreators;
        setClose(false)
        if (repairmanSearch === undefined) {
            actSearchRepairman('', 1, 7)
        } else {
            actSearchRepairman(repairmanSearch, 1, 7)
        }
    }
    const handleChangeRepairmanSearch = (e) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actSearchRepairman} = maintenanceCardAddActionCreators;
        actSearchRepairman(e.target.value, 1, 7)
        setRepairmanSearch(e.target.value)
    }
    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalRepairman > repairmanPage * 7) {
                const {maintenanceCardAddActionCreators} = props;
                const {actUpdateListRepairman} = maintenanceCardAddActionCreators;
                if (repairmanSearch === undefined) {
                    actUpdateListRepairman("")
                } else
                    actUpdateListRepairman(repairmanSearch)
            }
        }
    }

    const calculateTimeLeftEmloyee = (timeLeft) => {

        let result = "";
        let hour = null;
        let minute = null;
        if (minMaintenanceCard != null) {
            const timeStart = new Date(minMaintenanceCard.timeStart);
            const now = new Date();

            let timeLeftEmp = timeLeft + "";
            if (timeLeftEmp.length >= 4) {
                timeLeftEmp = timeLeftEmp.substring(0, 4);
            }

            if (timeLeftEmp.indexOf(".") == -1) {
                hour = parseInt(timeStart.getHours() + timeLeft);
                result = hour - now.getHours() + " Tiếng";
                return result;
            } else if (timeLeftEmp.indexOf(".") != -1) {
                hour = timeLeftEmp.substring(0, timeLeftEmp.indexOf("."));

                minute = timeLeftEmp.substring(timeLeftEmp.indexOf(".") + 1, timeLeftEmp.length);
                debugger
                console.log(hour, minute)
                if (minute > 58) {
                    var integer = Math.round(parseInt(minute) / 60);
                    var decimal = Math.round(parseInt(minute) % 60);
                    hour += parseInt(integer);
                    minute = parseInt(decimal);
                }
                console.log(timeStart.getHours())
                let hour1 = parseInt(timeStart.getHours()) + parseInt(hour);

                let minute1 = parseInt(minute) + parseInt(timeStart.getMinutes());
                let hour2 = parseInt(hour1) - parseInt(now.getHours());


                if (hour2 <= 0) {
                    return "Đã hoàn thành";
                } else {
                    let minute2 = parseInt(minute1) - parseInt(now.getMinutes());
                    result = hour2 + " Tiếng - " + minute2 + " Phút";
                    return result;
                }

            }
        }
        return result;
    }

    const renderItem = (data) => {


        return {
            value: data.user.id.toString(),
            label: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >

                    {data.user.id != 0 ? <>
                            <div>
                        <span style={{minWidth: '50%', float: 'left'}}>
                            <UserOutlined
                                style={{color: '#1890ff'}}/> Tên: {data.user.fullName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                            </div>
                            <span>
                                <div style={{minWidth: '50%', float: 'left'}}>
                                Số phiếu đang sửa: {data.numberMaintenanceCards}           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                {/*  <div style={{minWidth: '20%', float: 'left'}}>*/}
                                {/*      Tổng thời gian sửa: {formatHourAndMinute(employee.timeLeft)}*/}
                                {/*</div>*/}

                    </span>
                        </> :
                        <Row><span style={{textAlign: 'left'}}><SyncOutlined
                            style={{color: 'blue', fontSize: '21px'}}
                            spin={true}/>  &nbsp;  Phiếu chờ sửa chữa</span></Row>}
                </div>
            ),
        };
    };
    const renderRepairmanOptions = () => {
        let result = [];
        lisRepairman.map((item, index) => {
            if (item.timeLeft == 0 || item.timeLeft == null) {
                console.log(item)
                result.push(renderItem(item));
            }
        })

        return [
            {
                label: <span>Thông tin nhân viên sửa chữa</span>,
                options: result,
            },
        ]
    }

    return (

        <>

            <Row>
                {employee.id != undefined ?
                    <>

                        <Row style={{width: '100%'}}>
                            <Col span={1}>
                                <UserOutlined style={{fontSize: 35, paddingTop: 5, color: '#1890ff'}}/>
                            </Col>
                            <Col span={9}>
                                <>Tên:<span style={{color: '#1890ff', cursor: 'pointer'}}> {employee.fullName}</span>
                                    <br/></>
                                <span style={{fontSize: '17px'}}>Email: {employee.email}</span> <br/>

                            </Col>
                            <Col span={13}>
                                <h3>Thông tin nhân viên</h3> <br/>
                                <span>SĐT: {employee.phoneNumber}</span><br/>
                                <span>Địa chỉ: {employee.address}</span><br/>

                            </Col>
                            <Col span={1}>
                                {props.maintenanceCardAdd.workStatus < 1 ?
                                    <CloseOutlined onClick={() => {
                                        setEmployee({...employee, user: undefined, id: undefined})
                                        setRepairmanSearch("");
                                    }} style={{fontSize: 20, color: 'red'}}/>
                                    : <></>}
                            </Col>
                        </Row>
                    </> :
                    <>
                        {employee.user === undefined ? (<AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                // dropdownMatchSelectWidth={500}
                                style={{
                                    width: '100%',
                                }}
                                onSelect={selectRepairmanItem}
                                onFocus={focusRepairmanInput}
                                value={repairmanSearch}
                                options={renderRepairmanOptions()}
                                onPopupScroll={handScrollAutoComplete}
                                className={error ? 'ant-form-item-has-error' : ''}
                            >
                                <Input.Search size="large" value={repairmanSearch} placeholder="Tìm kiếm nhân viên sửa chữa"
                                              onChange={handleChangeRepairmanSearch}/>
                            </AutoComplete>)
                            :
                            <Row style={{width: '100%'}}>
                                <Col span={1}>
                                    <UserOutlined style={{color: '#1890ff', fontSize: 35, paddingTop: 5}}/>
                                </Col>
                                <Col span={9}>
                                    <>Tên:<span
                                        style={{color: '#1890ff', cursor: 'pointer'}}> {employee.user.fullName}</span>
                                        <br/></>
                                    <span style={{fontSize: '17px'}}>Email: {employee.user.email}</span> <br/>
                                    <span
                                        style={{fontSize: '17px'}}>Số phiếu đang sửa: {employee.numberMaintenanceCards}</span>
                                    <br/>
                                    {employee.numberMaintenanceCards === undefined ? <></> : <></>}
                                </Col>
                                <Col span={13}>
                                    <h3>Thông tin nhân viên</h3> <br/>
                                    <span>SĐT: {employee.user.phoneNumber}</span><br/>
                                    <span>Địa chỉ: {employee.user.address}</span><br/>
                                    {employee.timeLeft === undefined ? <></> : <> <span style={{fontSize: '17px'}}>Thời gian sửa còn lại: {employee.timeLeft != null ? calculateTimeLeftEmloyee(employee.timeLeft) : 0}</span>
                                        <br/></>}

                                </Col>
                                <Col span={1}>
                                    {closeRemove === false ?

                                        <CloseOutlined onClick={() => {
                                            setEmployee({...employee, user: undefined})
                                            setRepairmanSearch("");
                                        }} style={{fontSize: 20, color: 'red'}}/>

                                        : <></>}

                                </Col>


                            </Row>}
                    </>}

            </Row>
        </>);
}
export default EmployeeSuggest;


