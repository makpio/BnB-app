import React from "react";
import Tree from "react-d3-tree";
import { Row } from "antd";

class CustomTree extends React.Component {
  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "30em" }}
      >
        <Tree
          data={this.props.data}
          orientation="vertical"
          onNodeToggle={null}
          onNodeClick={this.props.onNodeClick}
          collapsible={false}
          initialDepth={this.props.initialDepth}
        />
      </Row>
    );
  }
}

export default CustomTree;
