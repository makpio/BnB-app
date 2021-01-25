import React from "react";
import { Row, Col, Form, Input, Button, Spin, Card } from "antd";
import CustomTree from "./Tree";
import AddNodeForm from "./AddNode";
import { LoadingOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Solve extends React.Component {
  state = {
    data:[{
        name: "Top Level",
        level: 0,
        children: [],
        
      }], 
    level: 1,
    parentId: null,
    task: null
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.task !== this.props.task) {
        this.setState({ task: nextProps.task })
      }
    }
  
  
  handleNodeClick = (nodeDatum) => {
    if ((nodeDatum.level + 1) !== this.state.level) {
        (window.confirm("You can modify only nodes on: " + this.state.level + "  level! "))
    
    }
    else if (window.confirm("Add child of node named: " + nodeDatum.name)) {
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
        console.log('xddd')
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

  constructor(props) {
    super(props);
    var handlerUpdateData  = this.handlerUpdateData.bind(this);
    }

  handlerUpdateData(node) {
    this.setState({
        data: this.addNode(node) }
    );
    console.log('it is work', node)
  };

  showNextLevel(xd) {
    this.setState({level: this.state.level + 1})
  };

  checkAnswer(data) {
    if(true) {(window.confirm("Your answer is not correct. Try again!"))}
    if(false) {this.setState({level: this.state.level + 1})}
    };
  


  render() {
   

    //{this.props.data = this.props.task.data}
    console.log("state node", this.state.parentId);
    return (
      <div>
        {this.props.task.data !== null ? (
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
                        
                          this.checkAnswer(this.props.taskId)
                        
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
                          if (window.confirm("Confirm showing answer:")) {
                            this.showNextLevel(this.props.taskId);
                          }
                        }}
                      >
                        Show Answer
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
