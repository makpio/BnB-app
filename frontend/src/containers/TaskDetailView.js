import React from 'react';
import axios from 'axios';
import Tasks from '../components/Task';
import { Card } from 'antd';


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
            <Card title={this.state.task.name}>
                <p>{this.state.task.name}</p>
            </Card>
                
        )
    }
}

export default TaskDetail;