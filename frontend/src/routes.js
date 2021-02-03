import React from "react";
import { Route, Switch } from "react-router-dom";

import TaskList from "./containers/TasksListView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PrivateRoute from "./helpers/PrivateRoute";
import AddTaskForm from "./containers/AddTaskView";
import EditTaskForm from "./containers/EditTaskView";
import TaskDetail from "./containers/TaskDetailView";
import TaskUserList from "./containers/UserTasksListView";
import ShowTaskForm from "./containers/ShowTaskView";


const BaseRouter = () => (
  <div>
    <Route exact path="/tasks" component={TaskList} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Switch>
      <PrivateRoute exact path="/tasks/new" component={AddTaskForm} />
      <PrivateRoute exact path="/tasks/user" component={TaskUserList} />
      <Route exact path="/tasks/:taskId" component={TaskDetail} />
    </Switch>
    <PrivateRoute exact path="/tasks/:taskId/edit" component={EditTaskForm} />
    <Route exact path="/tasks/:taskId/show" component={ShowTaskForm} />

  </div>
);

export default BaseRouter;
