import React from "react";
import { Row, Col, Form, Input, Button, Spin, Card } from "antd";
import CustomTree from "./Tree";
import AddNodeForm from "./AddNode";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import axios from "axios";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class ShowTask extends React.Component {
  state = {
    data: null,
    parentId: null,
  };
  

  componentWillReceiveProps(nextProps){
    if (nextProps.task !== this.props.task) {
        console.log('mam cie')
      this.setState({ data: nextProps.task.data })
    }
  }
 
 

  render() {
      
    console.log("state node", this.state.data);
    return (
      <div>
         {this.state.data !== null ?  (
          <div className="site-card-wrapper">
            {" "}
            <Row gutter={16}>
              <Col span={7}>
                {" "}
                <Form
                  name="CustomForm"
                  initialValues={{
                    username: this.props.task.username,
                    description: this.props.task.description,
                    name: this.props.task.name,
                    solution: this.props.task.solution
                  }}
                  
                  labelCol={{
                    span: 6,
                  }}
                  layout="horizontal"
                  scrollToFirstError
                >
                   <Card title="Task informations:" bordered={true}>
                    <Form.Item
                      name="username"
                      label="Username"
                    >
                      <Input value="username" readOnly />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      label="Task name"
                      rules={[
                        {
                          required: true,
                          message: "Please input task name",
                        },
                      ]}
                    >
                      <Input placeholder="Task name" value="name" readOnly/>
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Please input task description!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Task description"
                        value="description"
                        autosize={{ minRows: 8, maxRows: 20 }}
                        readOnly
                      />
                    </Form.Item>
                    <Form.Item
                      name="solution"
                      label="Solution"
                      rules={[
                        {
                          required: true,
                          message: "Please input task solution",
                        },
                      ]}
                    >
                      <Input placeholder="Task solution" value="solution" readOnly/>
                    </Form.Item>{" "}
                  </Card>

                  <Form.Item></Form.Item>
                  <Form.Item></Form.Item>

                 
                </Form>
              </Col>
              <Col span={17} label="Task">
                <Card title="Task Tree:" bordered>
                  {" "}
                  <CustomTree
                    data={this.state.data}
                    onNodeClick={this.handleNodeClick}
                  ></CustomTree>
                </Card>{" "}
              </Col>
            </Row>
          </div>
        ) : (
          <Spin indicator={antIcon} />
        )}
      </div>
    );
  }
}

export default withRouter(ShowTask);
