import React from 'react';
import { Route } from 'react-router-dom';

import TaskList from './containers/TaskListView';
import TaskDetail from './containers/TaskDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={TaskList}/>
        <Route exact path='/:taskId' component={TaskDetail}/>
    </div>
);

export default BaseRouter;