import React from "react";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CustomForm from "../components/Form";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class EditTaskForm extends React.Component {
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
    if (this.state.task.data === undefined) return <div><Spin indicator={antIcon} /></div>;
    return (
      <div>
        <CustomForm
          requestType="put"
          taskId={this.props.match.params.taskId}
          buttonName="Save"
          task={this.state.task}
        />
      </div>
    );
  }
}

export default EditTaskForm;
