import React, { Component } from 'react'
import {
  IconButton,
  Grid,
  Icon,
  TablePagination,
  Button,
  TextField,
  Tooltip
} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  getManufacturerPage

} from '../../apis/manufacturer'   
import {
  addModelbike,
  updateModelbike

} from '../../apis/modelBike'   
 
function MaterialButton(props) { 
  const item = props.item

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={() => props.onSelect(item, 0)}>
          <Icon color="primary">edit</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => props.onSelect(item, 1)}>
          <Icon color="error">delete</Icon>
        </IconButton>
      </Tooltip>
    </div>
  )
}

class Categories extends Component {
  state = {
    rowsPerPage: 25,
    page: 0,
    itemList: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false,
    keyword: '',
    columns:[]
  }
  numSelected = 0
  rowCount = 0

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }

  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { })
  }

  handleKeyDownEnterSearch = (e) => {
    if (e.key === 'Enter') {
      this.search()
    }
  }
  handleChange = (event, source) => {
    event.persist()
    if (source === 'switch') {
      this.setState({ isActive: event.target.checked })
      return
    }
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData()
    })
  }

  saveOrUpdate = () =>{
    let id = this.state.id
    if (!id) {
      addModelbike({
        ...this.state,
      }).then(() => {    
      })
    } else {
      updateModelbike({
        ...this.state,
      }).then(() => { 
      })
    };
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  search() {
    this.setState({ page: 0 }, function () {
     this.updatePageData()
    })
  }

  updatePageData = () => {
    var searchObject = {}
    searchObject.keyword = this.state.keyword
    searchObject.pageIndex = this.state.page + 1
    searchObject.pageSize = this.state.rowsPerPage
    getManufacturerPage(1,99999,"","","").then(({ data }) => {
      this.setState({
        columns: data.manufacturer,
        // totalElements: data.totalElements,
      })
    })
  }

  // handleDownload = () => {
  //   var blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' })
  //   saveAs(blob, 'hello world.txt')
  // }
  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
    })
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    })
    this.updatePageData()
  }

  handleDeleteItem = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    })
  }

  handleEditItem = (item) => {
    // getItemById(item.id).then((result) => {
    //   this.setState({
    //     item: result.data,
    //     shouldOpenEditorDialog: true,
    //   })
    // })
  }

  handleConfirmationResponse = () => {
    const { t, i18n } = this.props
    if (this.state.itemList.length === 1) {
      let count = this.state.page - 1
      this.setState({
        page: count,
      })
    } else if (this.state.itemList.length === 1 && this.state.page === 1) {
      this.setState({
        page: 1,
      })
    }
    // deleteCheckItem(this.state.id)
    //   .then((res) => {
    //     this.handleDialogClose()
    //     this.updatePageData()
    //   })
    //   .catch((err) => {
    //     toast.warning(t('Category.checkduplicate'));
    //     this.handleDialogClose()
    //   })
  }

  componentDidMount() {
    this.updatePageData()
  }

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    })
  }

  handleClick = (event, item) => {
    let { itemList } = this.state
    if (item.checked == null) {
      item.checked = true
    } else {
      item.checked = !item.checked
    }
    var selectAllItem = true
    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].checked == null || itemList[i].checked == false) {
        selectAllItem = false
      }
      if (itemList[i].id == item.id) {
        itemList[i] = item
      }
    }

    this.setState({
      selectAllItem: selectAllItem,
      itemList: itemList,
    })
  }
  handleSelectAllClick = (event) => {
    let { itemList } = this.state
    for (var i = 0; i < itemList.length; i++) {
      itemList[i].checked = !this.state.selectAllItem
    }
    this.setState({
      selectAllItem: !this.state.selectAllItem,
      itemList: itemList,
    })
  }

  handleDelete = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    })
  }

  async handleDeleteList(list) {
    const { t, i18n } = this.props
    let listAlert = [];
    for (var i = 0; i < list.length; i++) {

      try {
        // await deleteCheckItem(list[i].id);
      } catch (error) {
        listAlert.push(list[i].name);
      }
    }
    this.handleDialogClose()
     
  }




  handleDeleteAll = (even) => {
    const { t, i18n } = this.props
    if (this.data != null) {
      this.handleDeleteList(this.data).then(() => {
        this.updatePageData()
        this.handleDialogClose()
      })
    }
    else {
     
    }
  }

  render() {
    const { t, i18n } = this.props
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog, name, code,age,columns
    } = this.state 
     

    return (
      <div className="m-sm-30">
       
        <div className="mb-sm-30"> 
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>  
            <Grid className="mb-10" container spacing={3}>
              <Grid item md={6} sm={6} xs={6}>
                <TextField
                  className="w-100 mb-10"
                  label="Tên"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={code} 
                />
                <TextField
                  className="w-100"
                  label="Năm"
                  onChange={this.handleChange}
                  type="text"
                  name="year"
                  value={name} 
                />
                  <Select
          label="Nhà sản xuất"
          id="demo-simple-select"
          value={age}
          onChange={this.handleChange}
        >
 {columns.map((lead) => (
                      
          <MenuItem value={lead.id}>{lead.name}</MenuItem>
                    ))}
        </Select>
              </Grid>
            </Grid> 
            <div className="flex flex-space-between flex-middle mt-36">
            <Button
                variant="contained"
                color="secondary"
                className="mr-36"
                onClick={() => this.props.handleClose()}
              >
              cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit" 
                >
               save
              </Button>
             

            </div>  
            
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Categories
