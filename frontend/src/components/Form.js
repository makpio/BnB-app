import React from "react"
import { Row, Col,  Form, Input, Button, Spin, Card } from "antd"
import CustomTree from "./Tree"
import AddNodeForm from "./AddNode"
import { LoadingOutlined } from "@ant-design/icons"

import axios from "axios"

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


class CustomForm extends React.Component {

  state = {
      data: null,
      parentId: null 
  }
  onFinish = (values, requestType, taskId, buttonName) => {
    const name = values.name
    const data = values.data
    const username= values.username
    const desciption = values.description
    console.log("Success:", name, data, username, desciption)

    if (requestType === "post") {
      axios
        .post(" http://localhost:8000/api/", {
          name: name,
          desciption: desciption,
          username: username,
          data: data

        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }
    if (requestType === "put") {
      axios
        .put(`http://localhost:8000/api/${taskId}/`, {
          name: name,
          desciption: desciption,
          username: username,
          data: data
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }
  }

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  handleNodeClick = (nodeDatum) => {
    window.alert(
      (nodeDatum.attributes.level) === "1" ? "Clicked a level 1 node named: " + nodeDatum.name : "Clicked a leaf node named: " + nodeDatum.name
    );
    this.setState({
        parentId: nodeDatum.name.toString()
    });
    
  }
//     addChildNode = () => {
//     const nextData = clone(this.state.data);
//     const target = nextData.children;
//     this.injectedNodesCount++;
//     target.push({
//       name: `Inserted Node ${this.injectedNodesCount}`,
//       id: `inserted-node-${this.injectedNodesCount}`
//     });
//     this.setState({
//       data: nextData
//     });
//   };

//   removeChildNode = () => {
//     const nextData = clone(this.state.data);
//     const target = nextData.children;
//     target.pop();
//     this.injectedNodesCount--;
//     this.setState({
//       data: nextData
//     });
//   };

  render() {
    
    if(this.state.data !== null) {
    this.props.task.data = this.state.data }

    //{this.props.data = this.props.task.data}
    console.log('state node', this.state.parentId)
    return (
        <div>
           {this.props.task.data  ? 
        <div className="site-card-wrapper">  <Row gutter={16}>
     <Col span={7}> <Form
        name="CustomForm"
        initialValues={{
            username: localStorage.username,
            description: this.props.task.description,
            name: this.props.task.name
          }}
        onFinish={(values) =>
          this.onFinish(values, this.props.requestType, this.props.taskId, this.props.admin, 
            this.props.username, this.props.description, this.props.data, this.props.buttonName)
        }
        onFinishFailed={this.onFinishFailed}
        labelCol={{
            span: 0,
          }}
        layout="horizontal"  
        scrollToFirstError
      ><Card title="Edit task form:" bordered={true} >
          
           <Form.Item
            name="username"
            label="Username"
            wrapperCol={{
                span: 0,
              }}
          >
            <Input value="username" readOnly/>
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
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Task name" value="name"/>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
             
              {
                //required: true,
                message: "Please input task description!",
              },
            ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input.TextArea placeholder="Task desciption" value="description"  autoSize={{ minRows: 8, maxRows: 20}}/>
          </Form.Item> </Card>
       
        <Form.Item></Form.Item><Form.Item></Form.Item>
        <Col>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            {this.props.buttonName}
          </Button></Form.Item></Col>
          {this.props.requestType === "pull" ?
            <Col offset={1}><Form.Item><Button size="large" type="danger" htmlType="submit" onClick={() => { if (window.confirm('Confirm deleting:')) {this.handleDelete()} }}>
              Delete
            </Button></Form.Item></Col>
           : (null)}
        
      </Form>
      </Col><Col span={13} label="Task">
      <Card title="Task Tree:" bordered > <CustomTree data={this.props.task.data} onNodeClick={this.handleNodeClick}> 
                    </CustomTree></Card> </Col><Col span={4} offset={0}><div > 
                        <Card title="Add Node:" bordered={true} >
                            <AddNodeForm parentId={this.state.parentId}/></Card>
                               </div></Col></Row></div>
                     : (
          <Spin indicator={antIcon} />
        ) }
      </div>
    )
  }
}

export default CustomForm
