import React from "react"
import axios from "axios"

import Tasks from "../components/Task"
import CustomForm from "../components/Form"

class TaskList extends React.Component {
  state = {
    tasks: [],
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/").then((res) => {
      this.setState({
        tasks: res.data,
      })
      console.log(res.data)
    })
  }

  render() {
    return (
        <Tasks data={this.state.tasks} />
    )
  }
}

export default TaskList
