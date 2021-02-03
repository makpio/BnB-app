import React from "react"

import { Form, Input, Button, Checkbox, Select} from "antd"

//import { UserOutlined, LockOutlined, MailOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"

const { Option } = Select;


class AddNodeForm extends React.Component {


   
  onFinish = (values, error) => {}
  
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


  handlerUpdateData  =  this.props.handlerUpdateData;

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
          onFinish = {(values, error) => {
            if (!error) {

              let node = {name: values.nodeId, attributes: { Evaluation: values.evaluation, "Decision Vars": values.value }}
              
              if (values.note !== undefined || values.note === "" ) {
                node.attributes['Note'] = values.note
              }
              if (values.closed !== undefined || values.closed === "none" ) {
                  node.attributes['Closed'] = values.closed
                  console.log('Xd', values.closed)
              }
              this.handlerUpdateData(node)
              
            }
            //this.props.history.push("/")
          }}
          labelCol={{
            span: 11,
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
            name="value"
            label="Decision Vars"
            rules={[
             
              {
                required: true,
                message: "Please input decision variables values!",
              },
            ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Decision variables" />
          </Form.Item>
          <Form.Item
            name="evaluation"
            label="Evaluation"
            rules={[
             
              {
                required: true,
                message: "Please input evaluation value!",
              },
            ]}
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Evaluation" />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            
            wrapperCol={{
                span: 0,
              }}
          >
            <Input placeholder="Note" />
          </Form.Item>
          <Form.Item
           name="closed"
           label="Closed">
          <Select
    showSearch
   
    placeholder="Select a reason"
    optionFilterProp="reason"
    filterOption={(input, option) =>
      option.reason.indexOf(input) >= 0
    }
    defaultValue = "none"
  >
    <Option value="none">None</Option>
    <Option value="bound">Bound</Option>
    <Option value="inegrity">Integrality</Option>
    <Option value=" infeasibility "> Infeasibility </Option>
  </Select>
          </Form.Item>
          
          <Form.Item>
            <Button  block={true} type="primary"  htmlType="submit" >
              Add Node
            </Button>
          </Form.Item>
         
        </Form>
        <Form  labelCol={{
            span: 17}}> <Form.Item
                      name="currentBestSol"
                      label="Current Best Solution"
                     
                    >
                      <Input
                        placeholder="Current Best Sol."
                        value="currentBestSol"
                        
                      />
                    </Form.Item>
                     <Form.Item
                      name="currentBestVar"
                      label="Current Best Variables"
                     
                    >
                      <Input
                        placeholder="Current Best Var."
                        value="currentBestVar"
                        
                      />
                    </Form.Item></Form>
      </div>
    )
  }
}

export default AddNodeForm
