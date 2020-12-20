import React from 'react';
import axios from 'axios';
import Tasks from '../components/Task';


const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    name: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

class TaskList extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        axios.get("/api/")
        .then(res => {
            this.setState({
                tasks: res.data
            });
            console.log(res.data);
        })
    }

    render() {
        return (
            <Tasks data={this.state.tasks}/>
        )
    }
}

export default TaskList;