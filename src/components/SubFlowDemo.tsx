/* eslint-disable */
import ELK from 'elkjs/lib/elk.bundled.js'
import React, { useCallback, useLayoutEffect } from 'react'
import ReactFlow, { ReactFlowProvider, addEdge, Panel, useNodesState, useEdgesState, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

const elk = new ELK()

// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html

const getLayoutedElements = (nodes: any, edges: any, options: any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT'
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node: any) => ({
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      width: 150,
      height: 60,
    })),
    edges: edges,
  }

  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      return {
        nodes: layoutedGraph.children?.map((node) => ({
          ...node,
          position: { x: node.x, y: node.y },
        })),

        edges: layoutedGraph.edges,
      }
    })
    .catch(console.error)
}

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [])
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }: any) => {
      const opts = {
        'elk.direction': direction,
        // 'elk.algorithm': 'layered',
        'elk.spacing.nodeNode': '25',
        'elk.layered.spacing.nodeNodeBetweenLayers': '100',
        'elk.layered.spacing': '50',
        'elk.spacing': '50',
        'elk.spacing.individual': '50',
      }
      const ns = useInitialNodes ? initialNodes : nodes
      const es = useInitialNodes ? initialEdges : edges
      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }: any) => {
        const gA = layoutedNodes
          .filter((item: any) => ['2', '5'].includes(item.id))
          .map((item: any) => ({ ...item, parentNode: 'g-2.5' }))

        console.log(gA, layoutedNodes)

        const groupNode = {
          id: 'g-2.5',
          data: { label: 'g-2.5' },
          position: { x: 252, y: 2 },
          style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 170, height: 200 },
        }

        setNodes([groupNode, ...layoutedNodes])
        setEdges(layoutedEdges)
        window.requestAnimationFrame(() => fitView())
      })
    },
    [nodes, edges]
  )

  useLayoutEffect(() => {
    onLayout({ direction: 'RIGHT', useInitialNodes: true })
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => onLayout({ direction: 'DOWN' })}>vertical layout</button>
        <button onClick={() => onLayout({ direction: 'RIGHT' })}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  )
}

const Aaa = () => (
  <div style={{ width: '100%', height: '100vh' }}>
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  </div>
)

export default Aaa

const position = { x: 0, y: 0 }

export const initialNodes = [
  {
    id: '1',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    data: { label: 'node 6' },
    position,
  },
]

export const initialEdges = [
  { id: '1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: '2-3', source: '2', target: '3', type: 'smoothstep' },
  { id: '3-4', source: '3', target: '4', type: 'smoothstep' },
  // { id: '1-4', source: '1', target: '4', type: 'smoothstep' },
  { id: '1-5', source: '1', target: '5', type: 'smoothstep' },
  { id: '5-6', source: '5', target: '6', type: 'smoothstep' },
  { id: '6-4', source: '6', target: '4', type: 'smoothstep' },
]
