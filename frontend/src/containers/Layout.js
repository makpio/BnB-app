import React from "react"
import { Layout, Menu, Breadcrumb } from "antd"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../redux/actions/auth"


const { Header, Content, Footer } = Layout
//
class CustomLayout extends React.Component {

  render() {
    return (
        //defaultSelectedKeys={["2"]}
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1">
              <Link to="/tasks">Tasks List</Link>
            </Menu.Item>
            {this.props.isAuthenticated ? (
            <Menu.Item key="3">
              <Link to="/tasks/new">Add Task</Link>
            </Menu.Item>
           
            ) :(null)}
            {this.props.isAuthenticated ? (
            <Menu.Item key="4">
              <Link to="/tasks">Edit Tasks</Link>
            </Menu.Item>
           
            ) :(null)}
          {this.props.isAuthenticated ? (
              <Menu.Item key="2" type="danger" onClick={() => { if (window.confirm('Are you sure you wish to logout?')) this.props.logout() } } >
                <Link to="/tasks">Logout</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="2">
                <Link to="/login/">Login</Link>
              </Menu.Item>
            )}
            </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
          
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}
/*
  <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">List</Link>
            </Breadcrumb.Item>
*/
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout))
