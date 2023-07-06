import { Position } from 'reactflow'
import type { Node, Edge } from 'reactflow'
import ELK from 'elkjs/lib/elk.bundled.js'
import { ElkNode } from 'elkjs'

export enum ECustomType {
  subNode = 'subNode',
  groupNode = 'groupNode',
}

export type NodeData<T = unknown> = {
  coreData?: T
  width?: number
  height?: number
  /** 占位展示 */
  value?: string
}
export type CustomNode<T = unknown> = Node<NodeData<T>>

export type EdgeData<T = unknown> = {
  coreData?: T
  /** 占位展示 */
  value?: string
}

export type CustomEdge<T = unknown> = Edge<EdgeData<T>>

export type TElements = {
  nodes?: CustomNode[]
  edges?: CustomEdge[]
}

const position = { x: 0, y: 0 }
export const initialNodes: Node[] = [
  {
    id: '1',
    type: ECustomType.subNode,
    data: { value: 'Node 1' },
    position,
    parentNode: 'g1.2',
  },
  {
    id: '2',
    type: ECustomType.subNode,
    data: { value: 'Node 2' },
    position,
    parentNode: 'g1.2',
  },
  {
    id: 'g1.2',
    type: ECustomType.groupNode,
    data: {},
    position,
  },
  {
    id: '3',
    type: ECustomType.subNode,
    data: { value: 'Node 3' },
    position,
    parentNode: 'g3.4',
  },
  {
    id: '4',
    type: ECustomType.subNode,
    data: { value: 'Node 4' },
    position,
    parentNode: 'g3.4',
  },
  {
    id: '5',
    type: ECustomType.subNode,
    data: { value: 'Node 5' },
    position,
    parentNode: 'g3.4',
  },
  {
    id: 'g3.4',
    type: ECustomType.groupNode,
    data: {},
    position,
  },
]

export const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
  },
  {
    id: '3-4',
    source: '3',
    target: '4',
  },
  {
    id: '2-5',
    source: '2',
    target: '5',
  },
  {
    id: 'g1.2-g3.4',
    source: 'g1.2',
    target: 'g3.4',
    hidden: true,
  },
]

function genGraph({ nodes = [], edges = [] }: TElements) {
  const [groupNodes, subNodes] = nodes.reduce<[Node[], Node[]]>(
    (prev, cur) => {
      cur.type === ECustomType.groupNode ? prev[0].push(cur) : prev[1].push(cur)
      return prev
    },
    [[], []]
  )
  const elk = new ELK()
  const graph: ElkNode = {
    id: 'root',
    layoutOptions: {
      'elk.direction': 'RIGHT',
    },
    children: groupNodes.map((group) => ({
      id: group.id,
      layoutOptions: {
        'elk.direction': 'RIGHT',
      },
      children: subNodes
        .filter((node) => node.parentNode === group.id)
        .map((node) => ({
          id: node.id,
          width: 100,
          height: 50,
          layoutOptions: {
            'elk.direction': 'RIGHT',
          },
        })),
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  }
  return { elk, graph }
}

export async function createLayout(els: TElements) {
  const { elk, graph } = genGraph(els)
  const layout = await elk.layout(graph)
  const commonOpt = { targetPosition: Position.Left, sourcePosition: Position.Right }
  const nodes = layout.children?.reduce((result: CustomNode[], current) => {
    result.push({
      id: current.id,
      type: ECustomType.groupNode,
      position: { x: current.x || 0, y: current.y || 0 },
      data: { value: current.id, width: current.width, height: current.height },
      ...commonOpt,
    })

    current.children?.forEach((child) =>
      result.push({
        id: child.id,
        type: ECustomType.subNode,
        position: { x: child.x || 0, y: child.y || 0 },
        data: { value: child.id, width: child.width, height: child.height },
        parentNode: current.id,
        ...commonOpt,
      })
    )
    return result
  }, [])

  return {
    nodes,
    edges: els.edges || [],
  }
}
