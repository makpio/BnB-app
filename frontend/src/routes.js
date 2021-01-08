import React from "react"
import { Route } from "react-router-dom"

import TaskList from "./containers/TaskListView"
import TaskDetail from "./containers/TaskDetailView"
import Login from "./containers/Login"
import Signup from "./containers/Signup"

import TaskDetailCopy from "./containers/TaskDetailView_copy"

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={TaskList} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/tasks/:taskId" component={TaskDetailCopy} />
  </div>
)

export default BaseRouter
