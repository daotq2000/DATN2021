import React from "react"
// import './main_login.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as usersActions from '../../actions/users';
import PropTypes from 'prop-types';
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import logo from "./logo.png"
import "../../asset/css/lite-style-1.min.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
 
const Login = (props) => {
  console.log(props);
  const {usersActionsCreator} = props;
  const {actlogin} = usersActionsCreator;
  const onFinish = (values) =>{
    console.log('Success:', values);
    actlogin(values);
  }
  const onFinishFailed =(errorInfo) =>{
    console.log(errorInfo)
  }
//   return (
//     <>
//       <Form 
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         layout="vertical"
//         name="basic">
//         <div className="body-sign-in">
//           <div className="container">

//             <div className="col-lg-10 col-md-10 col-sm-8 col-xs-12 login-wrapper col-md-offset-1 col-lg-offset-1 col-sm-offset-2">
//               <div className="row">
//                 <div className="area-login">
//                   <div className="col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-login">
//                       {/* <form method="post" action="https://vip321.mysapo.vn/admin/authorization/login?returnurl=%2Fadmin%2Fdashboard%3Ftype%3D4"> */}
//                         <div className="login-logo text-center">
//                           <img src={logo} alt="sapo" />
//                         </div>
//                         <div className="login-input text-center">

//                           <div className="login-mail next-input-wrapper">
//                             {/* <input style={{ position: 'relative', opacity: '100', cursor: 'pointer', width: '100%', height: '45px' }} className="next-input login-input-mail" id="login" placeholder="Địa chỉ email" autoFocus="autofocus" type="email" name="Email" /> */}
//                             <Row style={{marginLeft:'95px'}}>
//                               <Form.Item style={{ width: '230px' }}
//                                 label='Email nhân viên'
//                                 name="username"
//                                 rules={
//                                   [
//                                     { required: true, message: 'Vui lòng nhập Email!' },
//                                     {
//                                       pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
//                                       message: "Email phải bao gồm @"
//                                     }
//                                   ]}

//                               >
//                                 <Input name="username" size="large" placeholder="Email nhân viên" />
//                               </Form.Item>
//                             </Row>
//                           </div>
//                           <div className="has-error">
//                             <span className="help-block field-validation-valid" data-valmsg-for="Email" data-valmsg-replace="true" />
//                           </div>
//                         </div>
//                         <div className="login-input text-center">
//                           <div className="login-mail next-input-wrapper">
//                             {/* <input style={{ position: 'relative', opacity: '100', cursor: 'pointer', width: '100%', height: '45px' }} className="next-input login-input-key" placeholder="Mật khẩu" type="password" data-val="true" data-val-required="Nhập vào mật khẩu" id="Password" name="Password" /> */}
//                             <Row style={{marginLeft:'95px'}}>
//                               <Form.Item style={{ width: '230px' }}

//                                 label='Mật khẩu'
//                                 name="password"
//                                 rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
//                               >
//                                 <Input.Password size="large" name="password" placeholder="Mật khẩu" />
//                               </Form.Item>

//                             </Row>
//                           </div>
//                           <div className="has-error">
//                             <span className="help-block field-validation-valid" data-valmsg-for="Password" data-valmsg-replace="true" />
//                           </div>
//                         </div>
//                         <span className="has-error">
//                           <span className="help-block"><div className="container-fluid-md notifications"><div className="ajax-notification"><span className="ajax-notification-message" /></div></div></span>
//                           <span> </span>
//                         </span>
                    
//                         <div className="btn-login-2">
//                           <Button type="primary" size="large" style={{width:'230px',height:'40px'}} htmlType="submit" className="btn-login ui-button ui-button--primary" title="Đăng nhập">Đăng nhập</Button>
//                         </div>
//                         <input name="__RequestVerificationToken" type="hidden" defaultValue="CfDJ8DA1016STPdNrAaTdK2HgWfnOaDQqyzIrm0RQieRrlikYZmWYjcVUoc_Fl7wCrO_dAZyRiQKfgoZqcyVClBJYNhKRJxZMe3LbZ3GTQn7K3IAwSZmUOTHAD29MU_JcndoR1gk_qOG6Q56x_lNclyt57E" />
//                       <div>
                        
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </Form>
//     </>
//   );
return(<>
  <div className="dt-root">
        <div className="dt-login--container dt-app-login--container">
          <div className="dt-login__content-wrapper">
            <div className="dt-login__bg-section">
              {/* <div className="dt-login__bg-content">
                <h1 className="dt-login__title">Sign In</h1>
                <p className="f-16">By Signing Up, you can avail full features of our services.</p>
                <p className="f-16">Get an account !!!</p>
              </div> */}
              <div className="dt-login__logo">
                <a className="dt-brand__logo-link" href="index.html">
                  <img className="dt-brand__logo-img" src={logo} alt="Wieldy" />
                </a>
              </div>
            </div>
            <div className="dt-login__content">
              <div className="dt-login__content-inner">
              <Form 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        name="basic">
                  <div className="form-group">
                  <Form.Item style={{ width: '100%' }}
                                
                                name="username"
                                rules={
                                  [
                                    { required: true, message: 'Vui lòng nhập Email!' },
                                    {
                                      pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                      message: "Email không hợp lệ"
                                    }
                                  ]}

                              >
                     
                    <Input size="middle" className="form-control"   placeholder="Tài khoản" prefix={<UserOutlined/>} />
                  </Form.Item>
                  </div>
                  <div className="form-group">
                  <Form.Item style={{ width: '100%' }}

//                                 label='Mật khẩu'
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                              >
                     
                    <Input.Password  className="form-control" size="middle" placeholder="Mật khẩu" prefix={<LockOutlined />} />
                 </Form.Item>
                  </div>
                  <div className="custom-control custom-checkbox mb-6 mb-lg-8">
                    <input className="custom-control-input" type="checkbox" id="checkbox-1" defaultChecked="checked" />
                    <label className="custom-control-label" htmlFor="checkbox-1">Nhớ mật khẩu</label>
                  </div>
                  <div className="form-group">
                    <Button htmlType="submit" type="primary" className="btn btn-primary text-uppercase">Đăng nhập</Button>
                  </div>
                  
          </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

</>);
}

Login.propTypes = {
  createUser: PropTypes.shape({
    usersActionsCreator: PropTypes.func,
  })
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    usersActionsCreator: bindActionCreators(usersActions, dispatch)
  }
};
 
export default (connect(mapStateToProps, mapDispatchToProps)(Login));