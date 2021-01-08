import React from "react"
import Tree from "react-d3-tree"

const myTreeData = [
  {
    name: "Top Level",
    attributes: {
      keyA: "val A",
      keyB: "val B",
      keyC: "val C",
    },
    children: [
      {
        name: "Level 2: A",
        attributes: {
          keyA: "val A",
          keyB: "val B",
          keyC: true,
        },
      },
      {
        name: "Level 2: B",
      },
    ],
  },
  {
    name: "Level 2: A",
    attributes: {
      keyA: "val A",
      keyB: "val B",
      keyC: "val C",
    },
    children: [
      {
        name: "Level 3: A",
        attributes: {
          keyA: "val A",
          keyB: "val B",
          keyC: "val C",
        },
      },
      {
        name: "Level 3: B",
      },
    ],
  },
  
]
//initialDepth = "0" set which deepth we need
class CustomTree extends React.Component {
  render() {
      const {tree} = this.props
      console.log(tree)
    return (
      <div id="treeWrapper" style={{ width: "100em", height: "40em" }}>
        <Tree data={tree} orientation="vertical" />
      </div>
    )
  }
}

export default CustomTree
