import React from 'react';
import axios from 'axios';
import { Card } from 'antd';

import Tasks from '../components/Task';
import CustomForm from '../components/Form'

class TaskDetail extends React.Component {

    state = {
        task: {}
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        axios.get(`/api/${taskId}`)
        .then(res => {
            this.setState({
                task: res.data
            });
            console.log(res.data);
        })
    }

    render() {
        return (
            <div>
                <Card title={this.state.task.name}>
                    <p>{this.state.task.name}</p>
                </Card>   
                <br/> 
                <h2>Update an task</h2>
                <CustomForm 
                    requestType="put"
                    taskId={this.props.match.params.taskId}
                    buttonName="Update"
                />
            </div>
        )
    }
}

export default TaskDetail;