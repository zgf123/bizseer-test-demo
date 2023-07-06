import React, { useEffect } from 'react'
import ReactFlow, { ReactFlowProvider, useEdgesState, useNodesState, Background, MiniMap, Controls } from 'reactflow'
import { initialNodes, initialEdges, ECustomType, createLayout } from './SubFlowDemo2/tools'
import SubNode from './SubFlowDemo2/SubNode'
import GroupNode from './SubFlowDemo2/GroupNode'

const nodeTypes = {
  [ECustomType.subNode]: SubNode,
  [ECustomType.groupNode]: GroupNode,
}

const Demo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    createLayout({ nodes: initialNodes, edges: initialEdges }).then((res) => {
      setNodes(res.nodes || [])
      setEdges(res.edges)
    })
  }, [])

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          fitViewOptions={{ maxZoom: 1 }}
          defaultEdgeOptions={{
            zIndex: 100,
          }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}

export default Demo
