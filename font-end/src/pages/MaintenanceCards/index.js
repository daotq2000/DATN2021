import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Pagination, Tag, Tabs } from 'antd';
import MaintenanceCardWorking from "../../components/MaintenanceCardList/MaintenanceCardWorking";
import {withStyles} from "@material-ui/core/styles";
import {orange} from "@material-ui/core/colors";
import BtnMaterial from "@material-ui/core/Button";
 
const { TabPane } = Tabs;


const MaintenanceCard = (props) => {

    const [currentTab, setCurrentTab] = useState(1);
 
    function callback(key) {
        setCurrentTab(key);
    }
    console.log(currentTab);
    return (
        <>
            
                    <MaintenanceCardWorking  />
           
     

        </>
    );
}


export default MaintenanceCard;