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
  Handle,
  Position,
  getSmoothStepPath,
} from 'reactflow'
// you need to import the reactflow styles
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
    type: 'custom',
    label: 'aaa',
    pathOptions: { offset: 40, borderRadius: 4 },
  },
]

const foreignObjectSize = 40

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation()
  alert(`remove ${id}`)
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: any) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={targetX - 12}
        y={targetY - 30}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
            x
          </button>
        </div>
      </foreignObject>
    </>
  )
}

function TextUpdaterNode({ data, isConnectable }: any) {
  return (
    <div className="text-updater-node">
      <div style={{ border: '1px solid red' }}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" />
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
}

const nodeTypes: any = { textUpdater: TextUpdaterNode }
const edgeTypes = {
  custom: CustomEdge,
}

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
        edgeTypes={edgeTypes}
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
