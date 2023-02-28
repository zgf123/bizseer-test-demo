/* eslint-disable */
import { useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow'
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css'

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, type: 'textUpdater', data: { label: '1' } },
  { id: '2', position: { x: 100, y: 200 }, data: { label: '2' } },
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    label: 'aaa',
    pathOptions: { offset: 40, borderRadius: 4 },
  },
]

function TextUpdaterNode({ data }: any) {
  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" />
      </div>
    </div>
  )
}

const nodeTypes: any = { textUpdater: TextUpdaterNode }

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => {
      console.log(params)
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        minZoom={0.1}
      >
        <MiniMap nodeStrokeWidth={3} pannable />
        <Controls />
        <Background />
        <Panel position="top-left">top-left12312232123131313131321</Panel>
      </ReactFlow>
    </div>
  )
}

export default Flow
