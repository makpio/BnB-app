import React from "react";
import { Row, Col, Form, Input, Button, Spin, Card } from "antd";
import CustomTree from "./Tree";
import AddNodeForm from "./AddNode";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Solve extends React.Component {
  state = {
    data:{
        name: "Top Level",
        children: [],
      }, 
    level: 0,
    parentId: null
  };


  handleNodeClick = (nodeDatum) => {
    if (window.confirm("Add child of node named: " + nodeDatum.name)) {
      this.setState({
        parentId: nodeDatum.name,
      });
    } else {
      this.setState({
        parentId: null,
      });
    }
  };
      addNode(node) {
      let nextData = this.state.data;
      //logika dodawania
      console.log('addingd is working', node)
      return nextData
    };

    removeNode(node){
      let nextData = this.state.data;
      //logika usuwania
      console.log('delete it is work', node)
      return nextData
    };

  constructor(props) {
    super(props);
    var handlerUpdateData  = this.handlerUpdateData.bind(this);
    }

  handlerUpdateData(node) {
    // const nextData = action === "delete" ? this.removeNode(node) : this.addNode(node)
    // this.setState({
    //     data: prevState + 1 }
    //         );
    console.log('it is work', node)
  };

  showNextLevel(xd) {

  };

  checkAnswear(data) {
    //if poprawne level++ 
    //else windows ze nie
    // if(){
    // window.confirm("Wrong Answear! Try again")}
    // else {

    };
  


  render() {
   

    //{this.props.data = this.props.task.data}
    console.log("state node", this.state.parentId);
    return (
      <div>
        {this.state.data !== null ? (
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
                  labelCol={{
                    span: 6,
                  }}
                  layout="horizontal"
                  scrollToFirstError
                >
                  <Card title="Task:" bordered={true}>
                    <Form.Item
                      name="username"
                      label="Author"
                    >
                      <Input value="username" readOnly />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      label="Task name"
                    >
                      <Input value="name" readOnly />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                    >
                      <Input.TextArea
                        value="description"
                        autosize={{ minRows: 8, maxRows: 20 }}
                        readOnly
                      />
                    </Form.Item>{" "}
                  </Card>

                  <Form.Item></Form.Item>
                  <Form.Item></Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      block={true}
                      size="large"
                      style={{ width: "140px" }}
                      onClick={() => {
                        if (window.confirm("Confirm deleting:")) {
                          this.checkAnswear(this.props.taskId);
                        }
                      }}
                    >
                      Check
                    </Button>
                  </Form.Item>
                  {this.props.requestType === "put" ? (
                    <Form.Item>
                      <Button
                        block={true}
                        size="large"
                        type="danger"
                        style={{ width: "140px" }}
                        onClick={() => {
                          if (window.confirm("Confirm showing answear:")) {
                            this.showNextLevel(this.props.taskId);
                          }
                        }}
                      >
                        Show Answear
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
                    initialDeepth={this.state.level}
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


export default withRouter(Solve);
