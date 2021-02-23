import {CloseOutlined, FilterOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider1 from '@material-ui/core/Divider';
import {
    AutoComplete,
    Button,
    Empty,
    Input,
    Row,
    Table,
    Tag,
    Checkbox,
    InputNumber,
    Col,
    Tree,
    Select,
    message,
    Popover
} from 'antd';
import React, {useState, useEffect} from 'react';
import {formatMonney} from '../../../utils/MonneyFormat'
import {Button as BtMaterial} from '@material-ui/core'
import {formatDate} from '../../../utils/DateFormat'
import {formatHourAndMinute} from '../../../utils/formatTimeMaintenanceCard'

import Button1 from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input1 from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select1 from '@material-ui/core/Select';

import {
    DownOutlined,
    FrownOutlined,
    SmileOutlined,
    MehOutlined,
    FrownFilled,
} from '@ant-design/icons';
import {getCategories, getManufactureList} from '../../../apis/products'
import {Divider} from 'antd';
import Option from "../../Option";
import FilterListIcon from '@material-ui/icons/FilterList';
import {login} from "../../../apis/users";
const Product = (props) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        image: {
            width: '100%',
        },
    }));

    // console.log(props);
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            icon: <SmileOutlined/>,
            children: [
                {
                    title: 'leaf',
                    key: '0-0-0',
                    icon: <MehOutlined/>,
                },
                {
                    title: 'leaf',
                    key: '0-0-1',
                    icon: ({selected}) => (selected ? <FrownFilled/> : <FrownOutlined/>),
                },
            ],
        },
    ];


    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'code',
            key: 'code',
            width: '15%',
            render: (text, data) => {
                if (user.role != 2) {
                    return (
                        <div className='link' style={{color: '#1890ff'}}>
                            <span style={{color: '#1890ff', cursor: 'pointer'}}
                                  onClick={() => window.open(`/admin/product/${data.id}`, "_blank")}>{text.toUpperCase()}</span>
                        </div>
                    )
                } else {
                    return <span>{text.toUpperCase()}</span>
                }
            }

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '50%'
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            width: '15%',
            render: (amount, data) => {
                if (user.role != 2 && (props.maintenanceCardAdd.info.returned === false || props.maintenanceCardAdd.info.returned === undefined)) {
                    // changeAmount(data.id, e.target.value)
                    return (<InputNumber type="number" value={amount} onChange={(e) => changeAmount(data.id, e)}/>)
                } else {
                    return (<span>{amount}</span>)
                }
            }
        },
        {
            title: 'Giá',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit',
            width: '15%',
            render: (pricePerUnit, data) => {
                if (data.warranty === 1) {
                    return (
                        <span>0 đ</span>
                    )
                } else {
                    return (
                        <span>{formatMonney(pricePerUnit)} đ</span>
                    )
                }
            }
        },
        (props.maintenanceCardAdd.info.returned === false || props.maintenanceCardAdd.returned == undefined && props.user.role != 2) && props.maintenanceCardAdd.payStatus != 1 ? (
            {
                title: '',
                dataIndex: 'key',
                key: 'key',
                width: '5%',
                render: (status, data) => <>{props.maintenanceCardAdd.info.returned ? <></> : <><CloseOutlined
                    style={{color: 'red'}} onClick={() => {
                    deleteItem(data.id)
                }}/></>}</>
            }) : <></>
    ];
    const { loading = true } = props;
    const [state, setState] = useState({
        visibleManufacture: false,
        visibleCategories: false
    })
    const handleChangeCategoriesId = (event) => {
        setSearchProductByMC({...searchProductByMC,categoriesId: event.target.value})
    };
    const handleChangeManufactureId = (event) => {
        setSearchProductByMC({...searchProductByMC,manufactureId: event.target.value})
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [totalTime, setToTalTime] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [productPage, setProductPage] = useState(0);
    const [totalProductPage, setTotalProductPage] = useState(0);
    const [search, setSearch] = useState('');
    const [sumMantainanceCard, setSumMantainanceCard] = useState(0);
    const [time, setTime] = useState(0);
    const [manufacture, setManufacture] = useState([]);
    const [categories, setCategories] = useState([])
    const {manufactureValue,setManufactureValue} = useState({});
    const {categoriesValue,setCategoriesValue} = useState({});
    const [option,setOption] = useState(1);
    const [searchProductByMC,setSearchProductByMC] = useState({
        categoriesId:0,
        manufactureId:0,
        page:productPage,
        search:search,
        isChoose:false
    })
    // console.log(props.sumMaintenanceCard);
    const [user, setUser] = useState({
        role: 0
    });

    useEffect(() => {
        setToTalTime(props.maintenanceCardAdd.totalTimeService)
    }, [props.maintenanceCardAdd.totalTimeService, props.maintenanceCardAdd.sumMaintenanceCard])
    useEffect(() => {
        setProductPage(props.maintenanceCardAdd.productPage)
    }, [props.maintenanceCardAdd.productPage]);
    useEffect(() => {
        setSumMantainanceCard(props.sumMaintenanceCard);
    }, [props.sumMaintenanceCard])
    useEffect(() => {
        setTotalProductPage(props.maintenanceCardAdd.totalProductPage)
    }, [props.maintenanceCardAdd.totalProductPage]);
    useEffect(() => {
        setListProduct(props.maintenanceCardAdd.listProduct)
    }, [props.maintenanceCardAdd.listProduct, props.maintenanceCardAdd.products]);
    useEffect(() => {
        setProducts(props.maintenanceCardAdd.products)
    }, [props.maintenanceCardAdd.products]);
    useEffect(() => {
        setUser(props.user)
    }, [props.user]);
    useEffect(() => {
        setTime(props.maintenanceCardAdd.time);
    }, [props.maintenanceCardAdd.time])


    const warrantyItem = (id) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actWarrantyProduct} = maintenanceCardAddActionCreators;
        actWarrantyProduct(id)
    }

    const renderItem = (product) => {
        return {
            value: product.id.toString(),
            label: (

                <div style={{display: 'flex', justifyContent: 'space-between'}}>


                       <div style={{minWidth:'10%',float:'left'}}>
                            {loading && product.image == null? (
                                <Skeleton variant="rect" width="40px" height="40px">
                                    <div style={{ paddingTop: '57%' }} />
                                </Skeleton>
                            ) : (
                                <img
                                    className={classes.image}
                                    src={`http://localhost:8080/${product.image}`}
                                    alt=""
                                />
                            )}
                       </div>
                    <Divider1 orientation="vertical" flexItem />
                    <div  style={{minWidth:'60%',float:'left'}}>
                        <span style={{fontWeight: 'bold'}}>{product.name}</span>
                        <div>{product.code.toUpperCase()}</div>
                    </div>
                    <Divider1 orientation="vertical" flexItem />
                    <div style={{textAlign: 'left',minWidth:'15%',float:'left'}}>
                        <div>Giá: {formatMonney(product.pricePerUnit)} đ</div>
                        <div>Số lượng: {product.quantity} {product.unit}</div>
                    </div>
                    <Divider1 orientation="vertical" flexItem />
                    <div style={{textAlign: 'left',minWidth:'15%',float:'left'}}>
                        <div>Hãng SX: {product.manufacture.name}  </div>
                        <div>DM :{product.category.name}</div>
                    </div>
                </div>
            ),
        };
    };

    const renderOptions = () => {
        let result = [];
        result = listProduct.map((item, index) => {
            return (
                renderItem(item)
            )
        })

        return [
            {
                label: <span>Thông tin sản phẩm</span>,
                options: result,
            },
        ]
    }
    useEffect(() => {

        setManufacture(props.maintenanceCardAdd.manufacture)
    }, [props.maintenanceCardAdd.manufacture])

    useEffect(() => {
        setCategories(props.maintenanceCardAdd.categories);
    }, [props.maintenanceCardAdd.categories])
    useEffect(() => {
        fetchManufacture()
    }, [])
    useEffect(() => {
        fetchCategories()
    }, [])

    const selectItem = (value) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actChooseProduct} = maintenanceCardAddActionCreators;
        const {actCalculateSumMaintenanceCard} = maintenanceCardAddActionCreators;
        let first = sumMantainanceCard;
        console.log(value);
        listProduct.forEach((val) => {
            if (val.id == value) {
                setSumMantainanceCard(first + val.pricePerUnit);
                actCalculateSumMaintenanceCard(parseInt(val.pricePerUnit));

            }
        })

        actChooseProduct(value)

    }
    const fetchCategories = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actFetchCategories} = maintenanceCardAddActionCreators;
        actFetchCategories("");
    }

    const focusInput = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actSearchProduct} = maintenanceCardAddActionCreators;
        const {actFetchProductByManufactureIdAndCategoriesId} = maintenanceCardAddActionCreators;

        if(searchProductByMC.manufactureId != 0){
            actFetchProductByManufactureIdAndCategoriesId(1,20,search,searchProductByMC.manufactureId,searchProductByMC.categoriesId);
        }else{
            actSearchProduct(search, 1, 5);
        }
    }

    const handleChangeInput = (e) => {
        setSearch(e.target.value)
        const {maintenanceCardAddActionCreators} = props;
        const {actSearchProduct} = maintenanceCardAddActionCreators;
        const {actFetchProductByManufactureIdAndCategoriesId} = maintenanceCardAddActionCreators;

        if(searchProductByMC.manufactureId != 0){
            actFetchProductByManufactureIdAndCategoriesId(1,20,search,searchProductByMC.manufactureId,searchProductByMC.categoriesId);
        }else{
            actSearchProduct(search, 1, 5);
        }
    }

    const deleteItem = (key) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actRemoveProduct} = maintenanceCardAddActionCreators;
        actRemoveProduct(key)
    }

    const changeAmount = (key, value) => {
        const {maintenanceCardAddActionCreators} = props;
        const {actChangeAmount} = maintenanceCardAddActionCreators;
        if (value === '') {
            value = 0;
        } else if (typeof value === 'string') {
            value = parseInt(value)
        }
        actChangeAmount(key, value)
    }

    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalProductPage > productPage) {
                const {maintenanceCardAddActionCreators} = props;
                const {actUpdateListProduct} = maintenanceCardAddActionCreators;
                if (search === undefined || search === "") {
                    actUpdateListProduct("")
                } else {

                    actUpdateListProduct(search)
                }
            }
        }
    }
    const contentManufacture = () => {
        let rs = [];

        rs = manufacture.map((val) => {
            return (
                <MenuItem value={(val.id)}>{val.name}</MenuItem>
            )
        });

        return rs;
    }
    const contentCategories = () => {

        let rs = [];
        if(categories != undefined){
            rs = categories.map((val) => {
                return (
                    <option value={val.id}>{val.name}</option>
                )
            });
        }

        return rs;
    }

    const fetchManufacture = () => {
        const {maintenanceCardAddActionCreators} = props;
        const {actGetManufacture} = maintenanceCardAddActionCreators;
        actGetManufacture(1, 100, '', '', '')
    }
    const timeSerivce = () => {
        let times = "";

        if (time != undefined) {

            let a = time.toString().split(".");

            let minute = 0;
            if (parseInt(a[1]) < 10) {
                minute = a[1] * 10;
                if (minute > 0) {
                    times = a[0] + " tiếng - " + minute + " phút";
                } else {
                    times = a[0] + " tiếng";
                }
            } else if (a[1] === undefined) {
                times = a[0] + " tiếng";
            } else {
                times = a[0] + " tiếng - " + a[1] + " phút";
            }


        }
        return times;
    }


    const handleChangeSelect = (e) => {
        if(e == 1){
            setSearchProductByMC({...searchProductByMC,categoriesId: 0,manufactureId: 0})
        setOption(1);
        }else{
            handleClickOpen();
            setOpen(!open);
            setOption(2);
        }

    }
    const calCulateToTalTime = () => {
        let times = "";
        let integer = 0;
        let decimal = 0;

        if (isNaN(totalTime)) {
            for (let i = 0; i < totalTime.length; i++) {
                let a = totalTime[i].split("-");
                integer += parseInt(a[0]);
                decimal += parseInt(a[1]);
            }


            if (decimal > 59) {
                let g = parseInt(decimal / 60);
                let t = parseInt(decimal % 60);
                integer += g;
                decimal = t;
            }
            if (decimal > 0) {
                times = integer + " tiếng-" + decimal + " phút";
            } else {
                times = integer + " tiếng";
            }
        }

        return times;
    }
    const {Option} = Select;
    const handleOkSearchByMC = (value)=>{
        if(searchProductByMC.manufactureId == 0 ){
            message.info("Vui lòng chọn hãng sản xuất");

        }
        if(searchProductByMC.categoriesId == 0){
            message.info("Vui lòng chọn danh mục")
        }
        if(searchProductByMC.categoriesId != 0 && searchProductByMC.manufactureId != 0){
            setOpen(false);
        }
    }
    const onclickSelect =(e) =>{
        console.log(e)
    }
    return (
        <>

            <Row>
                {user.role !== 2 && (props.maintenanceCardAdd.info.returned != true) ?
                   <>
                <Col span={20}>


                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            style={{width: '120%'}}
                            options={renderOptions()}
                            allowClear={true}
                            onSelect={selectItem}
                            onFocus={focusInput}
                            value={search}
                            onPopupScroll={handScrollAutoComplete}
                        >
                            <Input size="large" placeholder="Tìm kiếm sản phẩm" onChange={handleChangeInput}/>

                        </AutoComplete>




                </Col>
                <Col span={4}>
                    <Select  defaultValue={option != "1"?1:`${option}`} onChange={handleChangeSelect}   style={{width: '100%', fontSize: '18px'}} >
                        <Option style={{height: '40px', fontSize: '18px'}} value="1">Tất cả</Option>
                        <Option  style={{height: '40px', fontSize: '18px'}} value="2">Tùy chọn</Option>

                    </Select>

                </Col>
                </>
                : <></>}
            </Row>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle><FilterListIcon style={{fontSize:20,color:'blue'}}/> &ensp;Lọc sản phẩm </DialogTitle>
                <DialogContent>
                    <div style={{minWidth: '314px'}}>
                        <InputLabel htmlFor="demo-dialog-native">Danh mục</InputLabel>
                        <Select1
                            style={{width: '100%', height: ' 45px', lineHeight: '20px'}}
                            native
                            onChange={handleChangeCategoriesId}
                            input={<Input1 id="demo-dialog-native"/>}
                            defaultValue="0"
                        >
                            <option value="0"></option>
                            {contentCategories()}
                        </Select1>
                    </div>
                    <div style={{minWidth: '314px', marginTop: '10px'}}>
                        <InputLabel id="demo-dialog-select-label">Hãng </InputLabel>
                        <Select1
                            defaultValue="0"
                            style={{width: '100%', height: ' 45px', lineHeight: '20px'}}
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            onChange={handleChangeManufactureId}
                            input={<Input1/>}
                            defaultValue={age}
                        >
                            <MenuItem value="0"></MenuItem>
                            {contentManufacture()}
                        </Select1>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOkSearchByMC} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Row>
                <Col span={24}>
                    <Table locale={{
                        emptyText: <Empty description='Không có sản phẩm' image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                    }}
                           dataSource={products}
                           columns={columns} style={{width: '100%', minHeight: '240px', marginTop: '20px'}}
                           pagination={false}/>
                </Col>

            </Row>
            <hr/>
            <Row style={{textAlign: 'right', marginTop: 30}}>

                <h3 style={{width: '100%'}}>Tổng
                    tiền: {sumMantainanceCard != undefined ? formatMonney(sumMantainanceCard) : 0} đ</h3>

                {props.maintenanceCardAdd.id != 0 && props.maintenanceCardAdd.id != undefined ? <><h3
                        style={{width: '100%'}}>Tổng thời gian dự kiến hoàn
                        thành: {props.maintenanceCardAdd.info.totalTime > 0 ? formatHourAndMinute(props.maintenanceCardAdd.info.totalTime) : ' đã hoàn thành'}</h3></> :
                    <></>}

                {props.maintenanceCardAdd.id == 0 ? <>   <h3 style={{width: '100%'}}>Tổng thời gian dự kiến hoàn
                    thành: {timeSerivce().length > 0 ? timeSerivce() : calCulateToTalTime().length > 0 ? calCulateToTalTime() : 'đã hoàn thành '}</h3></> : <></>}
                {props.maintenanceCardAdd.returnDate != undefined && props.maintenanceCardAdd.returnDate != null ?
                    <>
                        {props.maintenanceCardAdd.info.returnDate != null ? <><h3 style={{width: '100%'}}>Thời gian trả
                            xe dự kiến: {formatDate(props.maintenanceCardAdd.returnDate)}</h3></> : <></>}
                    </> : <></>}
            </Row>

        </>
    );
}

export default Product;