import React from 'react';
import axios from 'axios';
import { Button, Card, Space, Typography, Spin, Row, Col } from 'antd';
import { LoadingOutlined } from "@ant-design/icons"
import CustomForm from '../components/Form'
import CustomTree from '../components/Tree'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Title } = Typography;


class TaskDetail extends React.Component {

    state = {
        task: {}
    }
     myTreeData = [
        {
          name: "Top Level",
          attributes: {
            level: "0",
            keyA: "val A",
            keyB: "val B",
            keyC: "val C",
          },
          children: [
            {
              name: "Level 1: A",
             // rule: "yes",
              attributes: {
                level: "1",
                keyA: "val A",
                keyB: "val BC",
                keyC: Boolean(1),
              },
              children: [
                {
                  name: "Level 2: A",
                  attributes: {
                    level: "2",
                    keyA: "val A",
                    keyB: "val B",
                    keyC: "val C",
                  },
                },
                {
                  name: "Level 2: B",
                  attributes: {
                    level: "2",
                    keyA: "val A",
                    keyB: "val B",
                    keyC: "val C",
                  },
                },
              ],
            },
            {
              name: "Level 1: B",
              attributes: {
                level: "1",
                keyA: "val A",
                keyB: "val B",
                keyC: "val C",
              },
              children: [
                {
                  name: "Level 2: C",
                  attributes: {
                    level: "2",
                    keyA: "val A",
                    keyB: "val B",
                    keyC: "val C",
                  },
                },
                {
                  name: "Level 2: D",
                  attributes: {
                    level: "2",
                    keyA: "val A",
                    keyB: "val B",
                    keyC: "val C",
                  },
                },
              ],
            },
          ],
        },
        
      ]
      
    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        axios.get(`http://localhost:8000/api/${taskId}`)
        .then(res => {
            this.setState({
                task: res.data
            });
            console.log('task data', res.data);
        })
    }

    handleDelete = (event) => {
        const taskId = this.props.match.params.taskId;
        axios.delete(`http://localhost:8000/api/${taskId}`);
        this.props.history.push('/');
    }
    


//<CustomTree tree={this.state.task.data}></CustomTree>
    render() {
        //let xd = JSON.stringify(this.myTreeData)
        //let test = Object.values(this.myTreeData)
        //let test = this.myTreeData
        //console.log('myTree test', test[0].children[1].children[0])
        //console.log('local storage', localStorage)
        //let newNode = {name: "Level3 A", attributes: {level: 3}}
        //var children = []
        //test[0].children[1].children.push(children)
        // let NodeGdzieDodajemy = test[0].children[1].children[0]
        // if (!("children" in NodeGdzieDodajemy)) {
        //     NodeGdzieDodajemy['children'] = []
        // }
        // console.log('a co tu mamy: ', NodeGdzieDodajemy.children.length)
         //spr czy istnieje - test dodawania do drzewa
        
        //test[0].children[1].children[1]['children'] = []
        //NodeGdzieDodajemy.children.push({name: null, attributes: null})
      //NodeGdzieDodajemy.children.push({name: "Level3 B", attributes: {level: 3, keyA: true}})

        //NodeGdzieDodajemy.children.push({name: "Level3 C", attributes: {level: 3}})
        // let xddd = JSON.stringify(test)
        // console.log('xddd', this.state.data)
        // console.log('data_string', JSON.stringify(this.state.task.data))
        // console.log('data_obj', this.state.task.data)
        // console.log('myTree_obj', this.myTreeData)
        //  console.log('myTree_string xd', xd)

        console.log(this.props.isAuthenticated)
        console.log('xddd', this.state.task.data)
        return (
            
            <div><Row type="flex" justify="center" align="middle" style={{minHeight: '80vh'}}>
            <Col span={14} style={{ verticalAlign: 'middle' }} >  <Card title={<Title level={2}>{this.state.task.name}</Title>}>
                {this.state.task.data ? <div>
                <Card title={this.state.task.username} subtitle="xd">
                    {this.state.task.description}
                    
                </Card>   
                {/* <CustomTree data={this.state.task.data}>
                </CustomTree> */}
                
        
            <Button size="large" type="primary" htmlType="submit" href={`/tasks/${this.state.task.id}/solve`}>
                Solve
            </Button></div> : <Spin indicator={antIcon} />}
            </Card></Col></Row></div>
          
        )
    }
}
//{this.state.task.username === localStorage.username || localStorage.username === "admin" ? ( ) : (null)}
export default TaskDetail;