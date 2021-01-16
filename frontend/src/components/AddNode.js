import React from "react"

import { Form, Input, Button, Checkbox } from "antd"

//import { UserOutlined, LockOutlined, MailOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"


class AddNodeForm extends React.Component {

  state = {
    newNode: ""

  }

  onFinish = (values, error) => {
   

  }
  /*
  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    axios.get(`http://localhost:8000/api/${taskId}`)
      .then(res => {
        this.setState({
          task: res.data
        });
        console.log(res.data);
      })
  }
  */
  onChange = e => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
      
    })
  }

  render() {
    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }
    console.log('nodeform*:',this.props.parentId)
   
    return (
      <div>
        {errorMessage}
 
        <Form
          name="AddNodeForm"
          key={this.props.parentId}
          initialValues={{
            parentId: this.props.parentId
          }}
          onFinish={(values, error) => {
            if (!error) {
              if (this.state.checked === true) {
                  values.isClosed = true
              }
              else {
                values.isClosed = false
              }
              this.onFinish(values.evaluation, values.isClosed, values.nodeId, values.parentId)
              this.newNode = ""
              //console.log(values)
            }
            //this.props.history.push("/")
          }}
          labelCol={{
            span: 0,
          }}
          layout="horizontal"  
          scrollToFirstError
        >
             <Form.Item
            name="parentId"
            label="Parent ID"
            rules={[
                {
                  required: true,
                  message: "Please choose Parent",
                },
              ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input value={this.props.parentId} readOnly placeholder="Parent ID" />
          </Form.Item>
          <Form.Item
            name="nodeId"
            label="Node ID"
            rules={[
              {
                required: true,
                message: "Please input node id",
              },
            ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Node ID"/>
          </Form.Item>

          <Form.Item
            name="evaluation"
            label="Evaluation"
            rules={[
             
              {
                required: true,
                message: "Please input evaluation!",
              },
            ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Evaluation" />
          </Form.Item>
          <Form.Item 
          name="isClosed" 
          label="Is Closed?"
          rules={[
             
            {
              //required: true,
              message: "Please decide if closed is noded!",
            },
          ]}
          >
         <Checkbox checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}/>
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Add Node
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default AddNodeForm
