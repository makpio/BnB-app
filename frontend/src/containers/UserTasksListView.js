import React from "react";
import axios from "axios";

import Tasks from "../components/Tasks";

class TaskUserList extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/").then((res) => {
      const userData = res.data.filter(
        (task) => task.username === localStorage.username
      );
      this.setState({
        tasks: userData,
      });
      console.log(res.data);
    });
  }

  render() {
    return <Tasks data={this.state.tasks} />;
  }
}

export default TaskUserList;
