import React from "react";
import axios from "axios";
import { Button, Card, Space, Typography, Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Title } = Typography;

class TaskDetail extends React.Component {
  state = {
    task: {},
  };
  myTreeData = [
    {
      name: "Top Level",
      attributes: {
        level: "0",
        keyA: "val A",
        keyB: "val B",
        keyC: "val C",
      },
      children: [
        {
          name: "Level 1: A",
          // rule: "yes",
          attributes: {
            level: "1",
            keyA: "val A",
            keyB: "val BC",
            keyC: Boolean(1),
          },
          children: [
            {
              name: "Level 2: A",
              attributes: {
                level: "2",
                keyA: "val A",
                keyB: "val B",
                keyC: "val C",
              },
            },
            {
              name: "Level 2: B",
              attributes: {
                level: "2",
                keyA: "val A",
                keyB: "val B",
                keyC: "val C",
              },
            },
          ],
        },
        {
          name: "Level 1: B",
          attributes: {
            level: "1",
            keyA: "val A",
            keyB: "val B",
            keyC: "val C",
          },
          children: [
            {
              name: "Level 2: C",
              attributes: {
                level: "2",
                keyA: "val A",
                keyB: "val B",
                keyC: "val C",
              },
            },
            {
              name: "Level 2: D",
              attributes: {
                level: "2",
                keyA: "val A",
                keyB: "val B",
                keyC: "val C",
              },
            },
          ],
        },
      ],
    },
  ];

  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    axios.get(`http://localhost:8000/api/${taskId}`).then((res) => {
      this.setState({
        task: res.data,
      });
      console.log("task data", res.data);
    });
  }

  //<CustomTree tree={this.state.task.data}></CustomTree>
  render() {
    // let NodeGdzieDodajemy = test[0].children[1].children[0]
    // if (!("children" in NodeGdzieDodajemy)) {
    //     NodeGdzieDodajemy['children'] = []
    // }

    //spr czy istnieje - test dodawania do drzewa

    //test[0].children[1].children[1]['children'] = []
    //NodeGdzieDodajemy.children.push({name: null, attributes: null})
    //NodeGdzieDodajemy.children.push({name: "Level3 B", attributes: {level: 3, keyA: true}})

    //NodeGdzieDodajemy.children.push({name: "Level3 C", attributes: {level: 3}})
    

    console.log(this.props.isAuthenticated);
    console.log("xddd", this.state.task.data);
    console.log("xdd", JSON.stringify(this.state.task.data))
    return (
      <div>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "80vh" }}
        >
          <Col span={14} style={{ verticalAlign: "middle" }}>
            {" "}  {this.state.task.data ? (
            <Card title={<div> <Row
                type="flex"  justify="end" align="top"><Title level={5}>{" Author: "}{this.state.task.username}</Title></Row><Title level={2}>{this.state.task.name}</Title>{" ("}{"id:"}{this.props.match.params.taskId}{")"}</div>}>
               {}
                <div>
                  <Card title>
                    <Typography.Text autosize={{ maxRows: "5" }}>
                      {" "}
                      {this.state.task.description}
                    </Typography.Text>
                  </Card>
                  {/* <CustomTree data={this.state.task.data}>
                </CustomTree> */}
                  <Row style={{ marginTop: 15 }}>
                    <Space size="middle" align="end">
                      <Button
                        block={true}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        href={`/tasks/${this.state.task.id}/solve`}
                      >
                        Solve
                      </Button>
                      {this.state.task.username === localStorage.username ? (
                        <Button
                          block={true}
                          size="large"
                          type="primary"
                          htmlType="submit"
                          href={`/tasks/${this.state.task.id}/edit`}
                        >
                          Edit
                        </Button>
                      ) : null}{" "}
                    </Space>
                  </Row>
                </div>
                </Card> ) : (
                <Spin indicator={antIcon} />
              )}
           
          </Col>
        </Row>
      </div>
    );
  }
}
export default TaskDetail;
