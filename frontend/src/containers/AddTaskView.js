import React from "react";

import CustomForm from "../components/Form";

class AddTaskForm extends React.Component {
  state = {
    task: null,
  };

  emptyTree = [
    {
      name: "Top Level",
      children: [],
    },
  ];

  render() {
    const emptyTree = { data: this.emptyTree };

    return (
      <div>
        <CustomForm
          requestType="post"
          taskId={null}
          buttonName="Add"
          task={emptyTree}
        />
      </div>
    );
  }
}

export default AddTaskForm;
