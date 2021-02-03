import React from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ShowTask from "../components/ShowTask";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class ShowTaskForm extends React.Component {
  state = {
    task: {},
  };

  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    axios.get(`http://localhost:8000/api/${taskId}`).then((res) => {
      this.setState({
        task: res.data,
      });
      console.log(res.data);
    });
  }

  render() {
    if (this.state.task.data === null)
      return (
        <div>
          <Spin indicator={antIcon} />
        </div>
      );
    return (
      <div>
        <ShowTask
          taskId={this.props.match.params.taskId}
          task={this.state.task}
        />
      </div>
    );
  }
}

export default ShowTaskForm;
