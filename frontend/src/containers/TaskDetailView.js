import React from "react"
import axios from "axios"
import { Button, Card, Space } from "antd"

import CustomForm from "../components/Form"

class TaskDetail extends React.Component {
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
    return (
      <div>
        <Card title={this.state.task.name}>
          <p>{this.state.task.description}</p>
        </Card>
        <br />
        <h2>Update an task</h2>
        <CustomForm requestType="put" taskId={this.props.match.params.taskId} buttonName="Update" />
        <Space size={[8, 16]} wrap>
          <form onSubmit={this.handleDelete}>
            <Button type="danger" htmlType="submit">
              Delete
            </Button>
          </form>
          <form>
            <Button type="primary" htmlType="submit" href={`/tasks/${this.state.task.id}/solve`}>
              Solve
            </Button>
          </form>
        </Space>
      </div>
    )
  }
}

export default TaskDetail
