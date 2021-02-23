import React from "react";
const Header = () =>{
    return(<>
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
          {/* <MenuFoldOutlined
            className="trigger"
            onClick={toggle}
            style={{ margin: 10, zIndex: 999 }}
          /> */}
        </Header>
    </>);
}
export default Header;