import React from "react";
import { Form, Input, Button, Spin, Card, Row, Typography } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../redux/actions/auth";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Title } = Typography;

class LoginForm extends React.Component {
  render() {
    if (localStorage.getItem("token") && this.props.error === null) {
      this.props.history.push("/tasks");
    }

    if (this.props.error) {
      window.confirm("Login failed:" + this.props.error.message);
    }

    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "80vh" }}
      >
        <Card
          title={<Title level={2}>Log In</Title>}
          style={{ verticalAlign: "middle" }}
        >
          {this.props.loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Form
              name="LoginForm"
              onFinish={(values, err) => {
                if (!err) {
                  this.props.onAuth(values.userName, values.password);
                }
              }}
            >
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                >
                  Log In
                </Button>
                or
                <NavLink style={{ marginLeft: "10px" }} to="/signup/">
                  Register
                </NavLink>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
