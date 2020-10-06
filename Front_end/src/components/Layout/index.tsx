import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Avatar, Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./index.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export interface MenuProps {}

const Layout1: React.FC<MenuProps> = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const height = window.innerHeight;

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "auto", minHeight: height, position: "relative" }}
      >
        <div className="logo" style={{ margin: 10, position: "fixed" }}>
          <img
            src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202009161225"
            alt="sapo"
            style={{ width: 50, backgroundSize: "cover" }}
          />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          style={{
            width: state.collapsed ? "50px" : "200px",
            minHeight: height,
            position: "fixed",
            top: 30,
          }}
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Phiếu sửa chữa">
            <Menu.Item key="1">
              <NavLink to="/admin/maintenanceCards/create">
                Tạo phiếu sửa chữa
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/admin/maintenanceCards">
                Danh sách phiếu sửa chữa
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<MailOutlined />} title="Khách hàng">
            <Menu.Item key="3">
              <NavLink to="/admin/customers/create">Tạo khách hàng</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/admin/customers">Danh sách khách hàng</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<MailOutlined />} title="Linh kiện">
            <Menu.Item key="5">
              <NavLink to="/admin/accessories/create">Tạo linh kiện</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/admin/accessories">Danh sách linh kiện</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<MailOutlined />} title="Dịch vụ">
            <Menu.Item key="7">
              <NavLink to="/admin/services/create">Tạo dịch vụ</NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink to="/admin/services">Danh sách dịch vụ</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<MailOutlined />} title="Nhân viên">
            <Menu.Item key="9">
              <NavLink to="/admin/employees/add">Tạo nhân viên</NavLink>
            </Menu.Item>
            <Menu.Item key="10">
              <NavLink to="/admin/employees">Danh sách nhân viên</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<MailOutlined />} title="Báo cáo">
            <Menu.Item key="13">
              <NavLink to="/admin/analytics/dashboard">Tổng quan</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            style={{
              position: "fixed",
              bottom: 0,
              width: state.collapsed ? "80px" : "200px",
            }}
            key="sub6"
            icon={<UserOutlined />}
            title="Nhân viên 1"
          >
            <Menu.Item key="11">
              <NavLink to="/admin/users/info">Thông tin nhân viên</NavLink>
            </Menu.Item>
            <Menu.Item key="12">
              <NavLink to="/logout">Đăng xuất</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#fff",
            position: "fixed",
            width: "100%",
            zIndex: 99
          }}
        >
          {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
          <MenuFoldOutlined
            className="trigger"
            onClick={toggle}
            style={{ margin: 10, zIndex: 999 }}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "43px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layout1;