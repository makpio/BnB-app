import React from "react"
import { Route, Switch } from "react-router-dom"

import TaskList from "./containers/TaskListView"
import TaskDetailCopy from "./containers/TaskDetailView_copy"
import Login from "./containers/Login"
import Signup from "./containers/Signup"
import PrivateRoute from "./helpers/PrivateRoute"

import AddNodeForm from "./components/AddNode"
import AddTaskForm from "./containers/AddTask"
import EditTaskForm from "./containers/EditTask"
import TaskDetail from "./containers/TaskDetailView"

const BaseRouter = () => (
  <div>
    <Route exact path="/tasks" component={TaskList} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Switch>
      <PrivateRoute exact path="/tasks/new" component={AddTaskForm} />
      <Route exact path="/tasks/:taskId" component={TaskDetail} />
    </Switch>
    <PrivateRoute exact path="/tasks/:taskId/edit" component={EditTaskForm} />
    {/* <Route exact path="/tasks/:taskId/solve" component={AddNodeForm} /> */}
    
  </div>
)

export default BaseRouter
