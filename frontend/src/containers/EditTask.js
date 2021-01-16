import React from "react"
import axios from "axios"
import { Button, Card, Space } from "antd"

import CustomForm from "../components/Form"

class EditTaskForm extends React.Component {
  state = {
    task: {},
  }

  componentDidMount() {
    const taskId = this.props.match.params.taskId
    axios.get(`http://localhost:8000/api/${taskId}`).then((res) => {
      this.setState({
        task: res.data,
      })
      console.log(res.data)
    })
  }

  handleDelete = (event) => {
    const taskId = this.props.match.params.taskId
    axios.delete(`http://localhost:8000/api/${taskId}`)
    this.props.history.push("/")
  }

  render() {
    if (this.state.task.data === null)
            return <div>loading</div>
    return (
      <div>
       
        <CustomForm requestType="pull" taskId={this.props.match.params.taskId} buttonName="Edit" task={this.state.task}/>
        
      </div>
    )
  }
}

export default EditTaskForm
