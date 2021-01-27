import React from "react";
import { Row, Col, Form, Input, Button, Spin, Card } from "antd";
import CustomTree from "./Tree";
import AddNodeForm from "./AddNode";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import axios from "axios";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class CustomForm extends React.Component {
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
 
  handleNodeClick = (nodeDatum) => {
    if (window.confirm("Add child of node named: " + nodeDatum.name)) {
      this.setState({
        parentId: nodeDatum.name,
      });
    } else if ((window.confirm("Delete node: " + nodeDatum.name))){
        this.removeNode(nodeDatum.name)
        this.setState({
            parentId: null,
          });
    } else {
      this.setState({
        parentId: null,
      });
    }
  };


  search (tree, value, key = 'name', reverse = false) {
    const stack = [ tree[0] ]
    while (stack.length) {
      const node = stack[reverse ? 'pop' : 'shift']()
      if (node[key] === value) return node
      node.children && stack.push(...node.children)
    }
    return null
  }
    
    addNode(node) {
    let nextData = JSON.parse(JSON.stringify(this.state.data) )
    console.log('co co to', nextData)
    node["children"] = []
    node["level"] = this.state.level
    let parent = this.search(nextData, this.state.parentId)
    if (this.search(nextData, node.name) !== null) {
        (window.confirm("Node with this name: " + node.name + "  currently exist! "))
        return nextData;
    }
    if (!("children" in parent)) {
        parent['children'] = []
    }
    if (parent['children'].length < 2) {
        parent['children'].push(node)
    }
    else  {
        (window.confirm("Node: " + this.state.parentId + "  cannot has more than 2 children! "))
    }

    return nextData
  };

  removeFromTree(parent, childNameToRemove){

    parent.children = parent.children
        .filter((child) => { return child.name !== childNameToRemove})
        .map((child) =>{ return this.removeFromTree(child, childNameToRemove)});
    return parent;
  }

    removeNode(nodeName) {
        if (nodeName === "Top Level") {
            (window.confirm("You cannot delete root node: " + nodeName))
            return;
        }
      let nextData = JSON.parse(JSON.stringify(this.state.data))
        this.removeFromTree(nextData[0], nodeName)
      this.setState({
        data: nextData }
    );
    };



  onFinish = (values, requestType, taskId, buttonName) => {
    const name = values.name;
    const data = this.state.data;
    const username = values.username;
    const description = values.description;
    const solution = values.solution
    console.log("Success:", name, data, username, description);

    if (requestType === "post") {
      axios
        .post(" http://localhost:8000/api/", {
          name: name,
          description: description,
          username: username,
          data: data,
          solution: solution,
        })
        .then((res) => console.log(res))
        .then(() => this.props.history.push("/tasks/user"))
        .catch((err) => console.error(err));
    }
    if (requestType === "put") {
      axios
        .put(`http://localhost:8000/api/${taskId}/`, {
          name: name,
          description: description,
          username: username,
          data: data,
          solution: solution,
        })
        .then((res) => console.log(res))
        .then(() => this.props.history.push("/tasks/user"))
        .catch((err) => console.error(err));
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleDelete = (taskId) => {
    axios.delete(`http://localhost:8000/api/${taskId}`);
    this.props.history.push("/tasks/user");
  };

  constructor(props) {
    super(props);
    var handlerUpdateData  = this.handlerUpdateData.bind(this);
}
handlerUpdateData(node) {
    console.log('tu jestem', node)
    this.setState({
        data: this.addNode(node) }
    );
    console.log('it is work', this.state.data)
  };

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
                    username: localStorage.username,
                    description: this.props.task.description,
                    name: this.props.task.name,
                  }}
                  onFinish={(values) =>
                    this.onFinish(
                      values,
                      this.props.requestType,
                      this.props.taskId,
                      this.props.admin,
                      this.props.username,
                      this.props.description,
                      this.state.data,
                      this.props.buttonName,
                      this.props.solution
                    )
                  }
                  onFinishFailed={(taskId) =>
                    this.onFinishFailed(this.props.taskId)
                  }
                  labelCol={{
                    span: 6,
                  }}
                  layout="horizontal"
                  scrollToFirstError
                >
                  <Card title="Edit task form:" bordered={true}>
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
                      <Input placeholder="Task name" value="name" />
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
                      <Input placeholder="Task solution" value="solution" />
                    </Form.Item>{" "}
                  </Card>

                  <Form.Item></Form.Item>
                  <Form.Item></Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block={true}
                      size="large"
                      style={{ width: "80px" }}
                    >
                      {this.props.buttonName}
                    </Button>
                  </Form.Item>
                  {this.props.requestType === "put" ? (
                    <Form.Item>
                      <Button
                        block={true}
                        size="large"
                        type="danger"
                        style={{ width: "80px" }}
                        onClick={() => {
                          if (window.confirm("Confirm deleting:")) {
                            this.handleDelete(this.props.taskId);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Form.Item>
                  ) : null}
                </Form>
              </Col>
              <Col span={13} label="Task">
                <Card title="Task Tree:" bordered>
                  {" "}
                  <CustomTree
                    data={this.state.data}
                    onNodeClick={this.handleNodeClick}
                  ></CustomTree>
                </Card>{" "}
              </Col>
              <Col span={4} offset={0}>
                <div>
                  <Card title="Add Node:" bordered={true}>
                    <AddNodeForm 
                      parentId={this.state.parentId}
                      handlerUpdateData = {this.handlerUpdateData.bind(this)}
                    />
                  </Card>
                </div>
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

export default withRouter(CustomForm);
