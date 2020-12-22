import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import {UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../redux/actions/auth';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class LoginForm extends React.Component {

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                    <Spin indicator={antIcon} />
     
                    :
                    
                    <Form
                    name="LoginForm"
                    onFinish={(values, err) => {
                        if (!err){
                            this.props.onAuth(values.userName, values.password);
                        }
                        this.props.history.push('/');
                        
                      }
                    }
                    >
                        <Form.Item
                        name="userName"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                            Log in
                        </Button>
                        or 
                        <NavLink style={{marginLeft: '10px'}} to="/signup/">
                            Register
                        </NavLink>
                        </Form.Item>
                    </Form>
                }
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

//LoginForm = Form.onFieldsChange(LoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
