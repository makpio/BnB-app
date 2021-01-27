import React from "react";
import axios from "axios";

import Solve from "../components/Solve";

class SolveForm extends React.Component {
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
    if (this.state.task.data === null) {return <div>loading</div>}
    else {
    return (
      <div>
        <Solve
          requestType="put"
          taskId={this.props.match.params.taskId}
          task={this.state.task}
          
        />
      </div>
    );}
  }
}

export default SolveForm;
