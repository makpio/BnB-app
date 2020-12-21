import React from 'react';
import { Form, Input, Button } from 'antd';

import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {

   
   onFinish = (values, requestType, taskId, buttonName) => {
          const name = values.name;
          console.log("Success:", name);

          if (requestType == 'post') {
                axios.post(" http://localhost:8000/api/", {
                    name: name
                })
                .then(res => console.log(res))
                .catch(err => console.error(err));
                
            }
          if (requestType == 'put') {
                axios.put(`http://localhost:8000/api/${taskId}/`, {
                    name: name
                })
                .then(res => console.log(res))
                .catch(err => console.error(err));
                         
            }

        };
      
    onFinishFailed = (errorInfo) => {
          console.log("Failed:", errorInfo);
        };

    render() {
        return (
            <Form
            name="basic"
            onFinish={(values) => this.onFinish(
                values,
                this.props.requestType,
                this.props.taskId,
                this.props.buttonName )}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item label="name" name="name">
              <Input name="name" placeholder="Enter a Title" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {this.props.buttonName}
              </Button>
            </Form.Item>
          </Form>
        );
    }     
}

export default CustomForm;
