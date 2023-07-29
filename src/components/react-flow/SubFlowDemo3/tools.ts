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
  // {
  //   id: '1',
  //   type: ECustomType.subNode,
  //   data: { value: 'Node 1' },
  //   position,
  //   parentNode: 'g1.2',
  // },
  // {
  //   id: '2',
  //   type: ECustomType.subNode,
  //   data: { value: 'Node 2' },
  //   position,
  //   parentNode: 'g1.2',
  // },
  // {
  //   id: 'g1.2',
  //   type: ECustomType.groupNode,
  //   data: {},
  //   position,
  // },
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
    id: '6',
    type: ECustomType.subNode,
    data: { value: 'Node 6' },
    position,
    parentNode: 'g3.4',
  },
  {
    id: '7',
    type: ECustomType.subNode,
    data: { value: 'Node 7' },
    position,
    parentNode: 'g3.4',
  },
  {
    id: '8',
    type: ECustomType.subNode,
    data: { value: 'Node 8' },
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

for (let i = 0; i < 0; i++) {
  initialNodes.push({
    id: 'i-i' + i,
    type: ECustomType.subNode,
    data: { value: 'Node 5' },
    position,
    parentNode: 'g3.4',
  })
}

const OtherNodes: Node[] = []
for (let i = 0; i < 20; i++) {
  OtherNodes.push({
    id: 'i' + i,
    type: ECustomType.subNode,
    data: { value: 'Node 5' + i },
    position,
  })
}

export const initialEdges: Edge[] = [
  // {
  //   id: '1-2',
  //   source: '1',
  //   target: '2',
  // },
  {
    id: '3-4',
    source: '3',
    target: '4',
  },
  {
    id: '4-5',
    source: '4',
    target: '5',
  },
  {
    id: '5-8',
    source: '5',
    target: '8',
  },
  // {
  //   id: '2-5',
  //   source: '2',
  //   target: '5',
  // },
  // {
  //   id: 'g1.2-g3.4',
  //   source: 'g1.2',
  //   target: 'g3.4',
  //   hidden: true,
  // },
]

function genGraph({ nodes = [], edges = [] }: TElements) {
  const [groupNodes, subNodes] = nodes.reduce<[Node[], Node[]]>(
    (prev, cur) => {
      cur.type === ECustomType.groupNode ? prev[0].push(cur) : prev[1].push(cur)
      return prev
    },
    [[], []]
  )
  const elk = new ELK({
    defaultLayoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'RIGHT',
      'elk.aspectRatio': '0.001',
      // 'org.eclipse.elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
      // 'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'LEFTDOWN',
      // 'org.eclipse.elk.alignment': 'LEFT',
      // 'org.eclipse.elk.layered.allowNonFlowPortsToSwitchSides': 'true',
      // 'org.eclipse.elk.commentBox': 'true',
      // 'org.eclipse.elk.layered.considerModelOrder.strategy': 'PREFER_NODES',
      // 'org.eclipse.elk.contentAlignment': 'H_LEFT',
      // 'org.eclipse.elk.layered.directionCongruency': 'ROTATION',
      // 'org.eclipse.elk.layered.priority.direction': '100',
      // 'org.eclipse.elk.layered.edgeLabels.centerLabelPlacementStrategy': 'HEAD_LAYER',
      // 'org.eclipse.elk.layered.nodePlacement.favorStraightEdges': 'true',
      // 'org.eclipse.elk.nodeSize.fixedGraphSize': 'true',
      // 'org.eclipse.elk.layered.crossingMinimization.forceNodeModelOrder': 'true',
      // 'org.eclipse.elk.layered.wrapping.strategy': 'SINGLE_EDGE',
      // 'org.eclipse.elk.layered.wrapping.correctionFactor': '0.001',
      // 'org.eclipse.elk.layered.wrapping.cutting.strategy': 'MANUAL',
      // 'org.eclipse.elk.layered.crossingMinimization.greedySwitch.activationThreshold': '0',
      // 'org.eclipse.elk.hypernode': 'true',
      // 'org.eclipse.elk.layered.considerModelOrder.noModelOrder': 'true',
      // 'org.eclipse.elk.layered.thoroughness': '100',
      // 'org.eclipse.elk.layered.priority.straightness': '100',
      // 'org.eclipse.elk.topdown.hierarchicalNodeAspectRatio': '0.01',
      // 'org.eclipse.elk.topdownLayout': 'true',
      // 'org.eclipse.elk.layered.layering.minWidth.upperBoundOnWidth': '-1',
      // 'org.eclipse.elk.layered.wrapping.validify.strategy': 'NO',
    },
  })
  const graph: ElkNode = {
    id: 'root',
    layoutOptions: {},
    children: groupNodes.map((group) => ({
      id: group.id,
      layoutOptions: {},
      children: [
        ...subNodes
          .filter((node) => node.parentNode === group.id)
          .map((node) => ({
            id: node.id,
            width: 100,
            height: 50,
          })),
        // {
        //   id: 'xxx1',
        //   layoutOptions: {
        //     'elk.aspectRatio': '0.001',
        //     'elk.padding': '[top=0,left=0,bottom=0,right=0]',
        //   },
        //   width: 100,
        //   height: 50,
        //   children: OtherNodes.map((node) => ({ id: node.id, width: 100, height: 50 })),
        // },
        {
          id: 'xxx2',
          layoutOptions: {
            'elk.padding': '[top=0,left=0,bottom=0,right=0]',
          },
          width: 100,
          height: 50,
          x: 0,
          children: new Array(3).fill(0).map((item, index) => ({ id: 'sub' + (index + 1), width: 100, height: 50 })),
        },
      ],
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
  console.log(layout)
  const commonOpt = { targetPosition: Position.Left, sourcePosition: Position.Right }
  const nodes = layout.children?.reduce((result: CustomNode[], current) => {
    result.push({
      id: current.id,
      type: ECustomType.groupNode,
      position: { x: current.x || 0, y: current.y || 0 },
      data: { value: current.id, width: current.width, height: current.height },
      ...commonOpt,
    })

    current.children?.forEach((child) => {
      if (child.id.startsWith('xxx')) {
        result.push({
          id: child.id,
          type: ECustomType.groupNode,
          position: { x: child.x || 0, y: child.y || 0 },
          data: { value: child.id, width: child.width, height: child.height },
          parentNode: current.id,
          zIndex: 11,
          ...commonOpt,
        })
        child.children?.forEach((subChild) => {
          result.push({
            id: subChild.id,
            type: ECustomType.subNode,
            position: { x: subChild.x || 0, y: subChild.y || 0 },
            data: { value: subChild.id, width: subChild.width, height: subChild.height },
            parentNode: child.id,
            zIndex: 11,
            ...commonOpt,
          })
        })
      } else {
        result.push({
          id: child.id,
          type: ECustomType.subNode,
          position: { x: child.x || 0, y: child.y || 0 },
          data: { value: child.id, width: child.width, height: child.height },
          parentNode: current.id,
          zIndex: 11,
          ...commonOpt,
        })
      }
    })
    return result
  }, [])

  return {
    nodes,
    edges: els.edges || [],
  }
}
