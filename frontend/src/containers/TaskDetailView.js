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

  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    axios.get(`http://localhost:8000/api/${taskId}`).then((res) => {
      this.setState({
        task: res.data,
      });
      console.log("task data", res.data);
    });
  }

  render() {
    console.log(this.props.isAuthenticated);
    console.log("xddd", this.state.task.data);
    console.log("xdd", JSON.stringify(this.state.task.data));
    return (
      <div>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "80vh" }}
        >
          <Col span={14} style={{ verticalAlign: "middle" }}>
            {" "}
            {this.state.task.data ? (
              <Card
                title={
                  <div>
                    {" "}
                    <Row type="flex" justify="end" align="top">
                      <Title level={5}>
                        {" Author: "}
                        {this.state.task.username}
                      </Title>
                    </Row>
                    <Title level={2}>{this.state.task.name}</Title>
                    {" ("}
                    {"id:"}
                    {this.props.match.params.taskId}
                    {")"}
                  </div>
                }
              >
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
                        href={`/tasks/${this.state.task.id}/show`}
                      >
                        Show Solution
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
              </Card>
            ) : (
              <Spin indicator={antIcon} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default TaskDetail;
