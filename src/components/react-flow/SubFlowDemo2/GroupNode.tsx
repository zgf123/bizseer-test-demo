import React, { FC } from 'react'
import { Position, Handle } from 'reactflow'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import type { NodeProps } from 'reactflow'
import type { NodeData } from './tools'

const GroupNode: FC<NodeProps<NodeData>> = ({ data }) => {
  return (
    <>
      <HandleWrapper type="target" hidden isConnectable={false} position={Position.Left} />
      <HandleWrapper type="source" hidden isConnectable={false} position={Position.Right} />
      <div
        className={`${boxClass} ${css({
          width: data.width,
          height: data.height,
        })}`}
      ></div>
    </>
  )
}

export default GroupNode

const boxClass = css`
  border: 1px solid #999;
  border-radius: 4px;
  text-align: center;
  line-height: 98px;
  background-color: pink;
`
const HandleWrapper = styled(Handle)`
  width: 8px;
  height: 8px;
  background-color: #c5cbd5;
  z-index: 1;
`
