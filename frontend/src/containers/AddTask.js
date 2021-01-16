import React from "react"
import axios from "axios"
import { Button, Card, Space } from "antd"

import CustomForm from "../components/Form"

class AddTaskForm extends React.Component {
  state = {
    task: {},
  }

  render() {
    return (
      <div>
       
        <CustomForm requestType="post" taskId={null} buttonName="Add" task={this.state.task} />
       
      </div>
    )
  }
}

export default AddTaskForm
