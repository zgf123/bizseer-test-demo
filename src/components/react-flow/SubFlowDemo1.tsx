/* eslint-disable */
import { useEffect, useState } from 'react'
import ReactFlow, { Controls, Background, ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import ELK from 'elkjs/lib/elk.bundled.js'

const initialNodes = [
  {
    id: 'A',
    group: '1',
  },
  {
    id: 'B',
    group: '1',
  },
  {
    id: 'C',
    group: '1',
  },
  {
    id: 'D',
    group: '2',
  },
  {
    id: 'E',
    group: '2',
  },
  {
    id: 'F',
    group: '3',
  },
  {
    id: 'G',
    group: '3',
  },
  {
    id: 'H',
    group: '1',
  },
  {
    id: 'I',
    group: '1',
  },
  {
    id: 'J',
    group: '1',
  },
]

const initialGroups = [
  {
    id: '1',
    width: 100,
    height: 100,
  },
  {
    id: '2',
    width: 100,
    height: 100,
  },
  {
    id: '3',
    width: 100,
    height: 100,
  },
]

const initialEdges = [
  { id: '1', source: '1', target: '2' },
  { id: '2', source: '2', target: '3' },
  { id: '3', source: 'A', target: 'B' },
  { id: '4', source: 'A', target: 'I' },
  { id: '5', source: 'B', target: 'C' },
  { id: '6', source: 'B', target: 'H' },
  { id: '7', source: 'C', target: 'D' },
  { id: '8', source: 'E', target: 'F' },
]

const elk = new ELK()

const graph = {
  id: 'root',
  layoutOptions: {
    // 'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',
  },
  children: initialGroups.map((group) => ({
    id: group.id,
    width: group.width,
    height: group.height,
    layoutOptions: {
      'elk.direction': 'RIGHT',
    },
    children: initialNodes
      .filter((node) => node.group === group.id)
      .map((node) => ({
        id: node.id,
        width: 100,
        height: 50,
        layoutOptions: {
          'elk.direction': 'RIGHT',
        },
      })),
  })),
  edges: initialEdges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  })),
}

async function createLayout() {
  const layout = await elk.layout(graph)
  const nodes = layout.children?.reduce((result: any[], current) => {
    result.push({
      id: current.id,
      position: { x: current.x, y: current.y },
      data: { label: current.id },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: { width: current.width, height: current.height },
    })

    current.children?.forEach((child) =>
      result.push({
        id: child.id,
        position: { x: child.x, y: child.y },
        data: { label: child.id },
        targetPosition: 'left',
        sourcePosition: 'right',
        style: { width: child.width, height: child.height },
        parentNode: current.id,
      })
    )

    return result
  }, [])

  return {
    nodes,
    edges: initialEdges,
  }
}

function Flow() {
  const [graph, setGraph] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const { nodes, edges } = await createLayout()
      setGraph({ nodes, edges } as any)
    })()
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {graph && (
        <ReactFlow
          defaultNodes={graph?.nodes}
          defaultEdges={graph?.edges}
          fitView
          defaultEdgeOptions={{
            zIndex: 100,
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      )}
    </div>
  )
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}
