import React from "react";
import Tree from "react-d3-tree";
import { Row } from "antd";
//initialDepth = "0" set which deepth we need
class CustomTree extends React.Component {
    
  render() {
    return (
        <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "20em" }}
      >
     
        <Tree
          data={this.props.data}
          orientation="vertical"
          //onClick={this.handleNodeClick}
          onNodeToggle={null}
          onNodeClick={this.props.onNodeClick}
          collapsible={false}
          initialDepth ={this.props.initialDepth}
        />
     </Row>
    );
  }
}
//  <div id="treeWrapper" style={{ height: "40em", alignContent:"middle" }}>
export default CustomTree;
//nodeToggleConditions={(node) => node.level <= this.initialDepth}
// renderCustomNodeElement={(rd3tProps) =>
//     renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })}

// const renderNodeWithCustomEvents = ({
//     nodeDatum,
//     toggleNode,
//     handleNodeClick
//   }) => (
//     <g>
//       <circle r="15" onClick={() => handleNodeClick(nodeDatum)} />
//       <text fill="black" strokeWidth="1" x="20" onClick={toggleNode}>
//         {nodeDatum.name} {nodeDatum.attributes.isClosed}{nodeDatum.attributes.keyA}
//       </text>

//     </g>
// );

// const handleNodeClick = (nodeDatum) => {
//     window.alert(
//       nodeDatum.children ? "Clicked a branch node" : "Clicked a leaf node."
//     );
//   };
